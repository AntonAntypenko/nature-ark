import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { createClient } from "@supabase/supabase-js";

/**
 * CLI Tool: Provision or Update Administrator Account
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts <EMAIL> <PASSWORD>
 *
 * Example:
 *   npx tsx scripts/seed-admin.ts admin@natureark.com Admin123456!
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use SUPABASE_SERVICE_ROLE_KEY (standard Supabase environment variable)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
  );
  process.exit(1);
}

const email = process.argv[2] || "admin@gmail.com";
const password = process.argv[3] || "admin";

// Admin operations require the service_role key to bypass RLS and Auth rate-limits
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log(`Checking admin status for: ${email}...`);

  // 1. Try to create the user directly via GoTrue Admin API
  const { data: createData, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "System Administrator",
        role: "admin",
      },
      app_metadata: {
        role: "admin",
      },
    });

  if (!createError && createData.user) {
    console.log("Admin account successfully created!");
    console.log(`User ID: ${createData.user.id}`);
    console.log(`Email: ${createData.user.email}`);
    return;
  }

  // 2. If the user already exists, elevate their role to admin
  if (createError && createError.message.includes("already registered")) {
    console.log("User already exists. Elevating permissions to admin...");

    // Find the user by email
    const { data: usersData, error: listError } =
      await supabase.auth.admin.listUsers();
    if (listError) {
      console.error("Failed to list users:", listError.message);
      process.exit(1);
    }

    const targetUser = usersData.users.find(u => u.email === email);
    if (!targetUser) {
      console.error("Could not locate existing user record.");
      process.exit(1);
    }

    // Update role metadata and reset password if provided
    const { data: updateData, error: updateError } =
      await supabase.auth.admin.updateUserById(targetUser.id, {
        password,
        user_metadata: {
          ...targetUser.user_metadata,
          role: "admin",
        },
        app_metadata: {
          ...targetUser.app_metadata,
          role: "admin",
        },
      });

    if (updateError) {
      console.error("Failed to elevate user permissions:", updateError.message);
      process.exit(1);
    }

    console.log("Admin permissions updated successfully!");
    console.log(`User ID: ${updateData.user.id}`);
    return;
  }

  console.error("Unexpected error provisioning admin:", createError?.message);
  process.exit(1);
}

main();

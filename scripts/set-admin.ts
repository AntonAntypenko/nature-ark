import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const userId = process.argv[2];

if (!userId) {
  console.error("Usage: npm run set-admin <USER_ID>");
  process.exit(1);
}

const supabase = createClient(process.env.SB_API_URL!, process.env.SB_SECRET!);

async function main() {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role: "admin" },
  });

  if (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  console.log("User updated:", data);
}

main();

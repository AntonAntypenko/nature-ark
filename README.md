# Nature Ark Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Using Supabase (Local Environment)

This project uses a local Supabase instance.

### Start Supabase locally

To use the commands below, install Supabase CLI globally:

```bash
npm install -g supabase
```

Or use `npx supabase ...` as an alternative.

### Available Supabase commands

```bash
npm run sb:start   # Start local Supabase
npm run sb:stop    # Stop local Supabase
npm run sb:reset   # Reset DB, run migrations & seed
npm run sb:push    # Push migrations to local DB
```

### Local Supabase URLs and Keys

When you start Supabase locally, you will see output similar to:

```
API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1
Database URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Publishable key: sb_publishable_...
Secret key: sb_secret_...
```

### Meaning of the main values

* **API URL** → Your Supabase REST API. Use this as `SUPABASE_URL`.
* **Publishable key** → This is the *anon public key*. Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
* **Secret key** → This is the *service role key*. Use as `SUPABASE_SERVICE_ROLE_KEY` (server only).

### Required environment variables

Create a `.env.local` file:

```
SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

---

## Running Migrations

To ensure you **always operate on the local database** and avoid accidental changes to production, use the `--local` flag.

### Create a migration

```bash
supabase migration new init_test_migration
```

(You may also use `npx supabase ...` if the CLI is not installed globally.)

### Apply migrations

```bash
supabase db reset --local
```

This will reset the local database, apply all migrations, and run seed data without touching production.

### Push migrations to local database

```bash
supabase db push --local
```

This applies pending migrations to your local database without resetting data.

---
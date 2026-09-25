
# Supabase Local Environment Setup Guide

This guide covers running, migrating, and managing your local Supabase instance for the **Nature Ark** project.

---

## 1. Prerequisites

Make sure Docker Desktop is installed and running on your machine.

You can install the **Supabase CLI** globally or use `npx`:

```bash
npm install -g supabase
```
Verify your installation:

```bash
supabase --version
```

---

## 2. Managing Local Database Lifecycle

Use the shorthand NPM scripts configured in package.json:

### Start Supabase

Spins up local Docker containers (PostgreSQL, Auth, Storage, Studio, Kong API Gateway):

```bash
npm run sb:start
```

### Stop Supabase

Stops the local containers without destroying your database state:

```bash
npm run sb:stop
```

### Reset Database & Seed Data

Resets the PostgreSQL instance, applies all schema migrations from supabase/migrations, and runs supabase/seed.sql:

```bash
npm run sb:reset
```

---

## 3. Local Credentials & Service Mapping

After executing `npm run sb:start`, the Supabase CLI provisions Docker containers and outputs connection details:

### Services & Tools Reference

| Category | Service / Endpoint | Status | Purpose & Usage in Nature Ark |
| :--- | :--- | :--- | :--- |
| **Dev Tools** | **Studio** (`http://127.0.0.1:54323`) | **ACTIVE** | Visual Web GUI to manage tables, run SQL queries, and inspect Auth users. |
| **Dev Tools** | **Mailpit** (`http://127.0.0.1:54324`) | **ACTIVE** | Local inbox catching email confirmations and password reset links. |
| **Dev Tools** | **MCP** (`http://127.0.0.1:54321/mcp`) | *UNUSED* | Model Context Protocol gateway for AI agent integrations (not needed for web core). |
| **APIs** | **Project URL** (`http://127.0.0.1:54321`) | **ACTIVE** | Core Supabase gateway; assigned to `NEXT_PUBLIC_SUPABASE_URL`. |
| **APIs** | **REST / GraphQL** endpoints | *INDIRECT* | Consumed automatically under the hood by `@supabase/ssr` SDK. |
| **Database** | **PostgreSQL URL** (`:54322`) | *STANDBY* | Direct database access URL (used optionally via external tools like DBeaver/DataGrip). |
| **Storage** | **S3 Protocol Details** | *UNUSED* | Direct S3 credentials; Nature Ark accesses storage via standard `supabase.storage` SDK. |

---

### Environment Variables Mapping (`.env.local`)

Only these three values are required for the project to run:

```env
# Project URL (Found under APIs -> Project URL)
NEXT_PUBLIC_SUPABASE_URL=[http://127.0.0.1:54321](http://127.0.0.1:54321)

# Publishable Key (Found under Authentication Keys -> Publishable)
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_local_anon_publishable_key>

# Secret Key (Found under Authentication Keys -> Secret)
SUPABASE_SERVICE_ROLE_KEY=<your_local_service_role_secret_key>
```

Security Scopes:

    NEXT_PUBLIC_SUPABASE_ANON_KEY (Publishable): Safe for client-side inclusion. Bound strictly to Row Level Security (RLS) rules in PostgreSQL.

    SUPABASE_SERVICE_ROLE_KEY (Secret): Super-admin token that completely bypasses RLS. Strictly restricted to server maintenance scripts (e.g., scripts/set-admin.ts) and must never leak into Next.js client bundles.

---

## 4. Migrations & Admin Utilities

### Creating a New Migration

To create a new schema change, execute:

```bash
supabase migration new <migration_name>
```

### Applying Pending Migrations

```bash
npm run sb:push
```

### Setting Admin Privileges

To promote a newly registered user to Admin role in the database, run the custom CLI utility script:

```bash
npm run set-admin
```
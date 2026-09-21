
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

## 3. Local Credentials & Dashboard

When you execute npm run sb:start, Supabase exposes the following local endpoints:
- Studio Dashboard (GUI): http://127.0.0.1:54323
- REST API URL: http://127.0.0.1:54321
- In-Database PostgreSQL: postgresql://postgres:postgres@127.0.0.1:54322/postgres

Copy the keys output in your terminal into .env.local:
- anon key $\rightarrow$ NEXT_PUBLIC_SUPABASE_ANON_KEY
- service_role key $\rightarrow$ SUPABASE_SERVICE_ROLE_KEY (Server-side only, never expose to client!)

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
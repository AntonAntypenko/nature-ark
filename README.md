# Nature Ark Project

A modern, production-grade Web Platform built with **Next.js 16 (App Router)**, **React 19**, **Supabase**, and **Redux Toolkit**.

---

## Tech Stack & Ecosystem

- **Framework:** Next.js 16 (App Router) + React 19
- **Database & Auth:** Supabase (`@supabase/supabase-js`)
- **Internationalization:** `next-intl` (Static SSG setup)
- **Styling:** Tailwind CSS v4 + `clsx` + `tailwind-merge` + `cva`
- **UI Components:** Radix UI Primitives + Lucide Icons
- **Animations:** `motion` (Framer Motion v12) + `tw-animate-css`
- **Forms & Validation:** `react-hook-form` + `@hookform/resolvers` + `zod` v3

---

## Quick Start

### 1. Requirements & Installation
Ensure you have Node.js (v20+) installed. Install project dependencies:

```bash
npm install
```

---

### 2. Environment Setup

Create a .env.local file in the root directory:

```
# Supabase Local Configuration
NEXT_PUBLIC_SUPABASE_URL=[http://127.0.0.1:54321](http://127.0.0.1:54321)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key
```

---

### 3. Start Development Server

Run the Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 4. Project Architecture & Documentation

This repository strictly adheres to Architecture Decision Records (ADR) regarding state management, database interactions, and page rendering modes:
- Read ARCHITECTURE.md to understand page paradigms, Tailwind cohesion, and Server/Client boundaries.
- Read SUPABASE_SETUP.md for local database initialization and migration workflows.
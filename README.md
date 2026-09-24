# Healix

Healix is an India-first healthcare provider discovery and appointment marketplace, launching in Moradabad and designed for future multi-city expansion.

## Current development slice

- `apps/web`: Next.js patient-facing website foundation
- `apps/api`: NestJS REST API foundation
- PostgreSQL/Prisma schema foundation is in place; OpenSearch, authentication, clinic workflows, and booking are next

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Run locally

```powershell
npm install
npm run dev:web
```

In a second terminal:

```powershell
npm run dev:api
```

- Website: `http://localhost:3000`
- API health: `http://localhost:4000/health`
- Published clinics API: `http://localhost:4000/clinics?city=moradabad`

## Database

Copy `packages/database/.env.example` to an environment file and set
`DATABASE_URL` to a Supabase PostgreSQL connection string before starting the
API. Generate the Prisma client with:

```powershell
npm run db:generate
```

After setting `DATABASE_URL`, seed the Moradabad city, launch specialties, and
development-only demo clinic:

```powershell
npm run db:seed
```

## MVP boundaries

Payments, SMS, WhatsApp, mobile, telemedicine, EHR, patient-doctor chat, AI diagnosis, prescriptions, complex insurance, and multi-clinic doctor assignment are intentionally deferred.

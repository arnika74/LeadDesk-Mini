# LeadDesk Mini

Full-stack lead capture application built for the Digital Heroes Training Task.

> [Built for Digital Heroes Training Task](https://digitalheroesco.com)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios, React Hook Form, Zod |
| Backend | Node.js, Express, JWT, bcrypt, express-validator, helmet, rate limiting |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Deploy | Frontend → Vercel, Backend → Render |

## Features

- Public SaaS landing page with validated lead form
- JWT admin authentication (bcrypt-hashed passwords)
- Admin dashboard: stats, search, status filter, pagination, status updates
- Client + server validation
- Toast notifications, loading and empty states
- Rate limiting on login and lead submission

## Project Structure

```
LeadDesk-Mini/
├── client/          # React SPA
└── server/          # Express API
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- Neon PostgreSQL database

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/LeadDesk-Mini.git
cd LeadDesk-Mini
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in `server/.env`, then:

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

API health check: `http://localhost:5000/api/health`

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

App: `http://localhost:5173`

## Environment Variables

### Server (`server/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `5000`) |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` | Signs JWT tokens (32+ characters recommended) |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `1d`) |
| `ADMIN_EMAIL` | Seed admin email |
| `ADMIN_PASSWORD` | Seed admin password (hashed with bcrypt) |
| `CLIENT_URL` | Allowed CORS origin (Vite URL or Vercel URL) |
| `NODE_ENV` | `development` or `production` |

### Client (`client/.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |

## API Overview

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/health` | No | Health check |
| `POST` | `/api/leads` | No | Create lead |
| `POST` | `/api/auth/login` | No | Admin login |
| `GET` | `/api/admin/stats` | Bearer | Dashboard stats |
| `GET` | `/api/admin/leads` | Bearer | List/search/paginate leads |
| `PATCH` | `/api/admin/leads/:id` | Bearer | Update lead status |

### Budget ranges

- Less than ₹25,000
- ₹25,000 – ₹50,000
- ₹50,000 – ₹1,00,000
- More than ₹1,00,000

### Lead statuses

`NEW` · `CONTACTED` · `CLOSED`

## Scripts

**Server**

- `npm run dev` — API with file watch
- `npm start` — production start
- `npm run prisma:migrate` — run migrations
- `npm run prisma:seed` — seed admin user
- `npm run test:smoke` — API smoke test (server must be running)

**Client**

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Status

Milestones 1–8 complete (scaffold → DB → API → auth/admin → frontend → polish).

Deployment (Vercel + Render) and Loom walkthrough are next.

## Demo

- Live frontend: _coming after deployment_
- Live API: _coming after deployment_
- Loom walkthrough: _coming at the end_

## License

Built for educational / internship evaluation purposes.

# LeadDesk Mini

Full-stack lead capture application built for the Digital Heroes Training Task.

> Footer credit (required): [Built for Digital Heroes Training Task](https://digitalheroesco.com)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios, React Hook Form, Zod |
| Backend | Node.js, Express, JWT, bcrypt, express-validator |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Deploy | Frontend → Vercel, Backend → Render |

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
- Neon PostgreSQL database (configured in Milestone 2)

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
# Fill in DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
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

Documented fully after Milestone 2 (database) and Milestone 9 (deployment).

See `server/.env.example` and `client/.env.example`.

## Scripts

**Server**

- `npm run dev` — start API with file watch
- `npm start` — start API (production)
- `npm run prisma:migrate` — run migrations
- `npm run prisma:seed` — seed admin user

**Client**

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Status

Milestone 1 complete — project scaffolding.

## Demo

- Live frontend: _coming after deployment_
- Live API: _coming after deployment_
- Loom walkthrough: _coming at the end_

## License

Built for educational / internship evaluation purposes.

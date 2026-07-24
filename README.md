# LeadDesk Mini

Full-stack lead capture application built for the Digital Heroes Training Task.

Live Demo: https://lead-desk-mini-orcin.vercel.app/

Backend API: https://leaddesk-mini-api-9dib.onrender.com

Repository: https://github.com/arnika74/LeadDesk-Mini

Built for Digital Heroes Training Task: https://digitalheroesco.com

## Project Overview

LeadDesk Mini is a full-stack lead management application consisting of:

Public landing page for collecting leads
Secure admin authentication
Lead management dashboard
PostgreSQL database
Production deployment using Render and Vercel

The application demonstrates the complete development lifecycle from planning and database design to deployment and production hardening.

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

## Development Journey

This project was developed incrementally by following a structured development process, ensuring that each layer of the application was fully functional before moving to the next.

### Phase 1 — Planning & Technology Selection

Before writing any code, I analyzed the internship requirements and selected a technology stack suitable for building a scalable full-stack application.

**Technology choices:**
- React + Vite for the frontend
- Node.js + Express for the backend
- PostgreSQL (Neon) as the cloud database
- Prisma ORM for database management
- JWT for authentication
- bcrypt for secure password hashing
- Render for backend deployment
- Vercel for frontend deployment

The project follows a client-server architecture, making deployment and maintenance easier.

---

### Phase 2 — Project Setup

#### Frontend Setup

- Created a React application using Vite.
- Configured Tailwind CSS for responsive UI development.
- Installed React Router for client-side routing.
- Added Axios for API communication.
- Integrated React Hook Form and Zod for form handling and validation.
- Organized the frontend into reusable components, layouts, pages, services, hooks, contexts, and utility functions.

#### Backend Setup

- Initialized an Express.js server.
- Configured Helmet for security headers.
- Configured CORS for frontend-backend communication.
- Added dotenv for environment variable management.
- Implemented centralized error handling.
- Added Express Validator for server-side validation.
- Configured rate limiting to protect public endpoints.

---

### Phase 3 — Database Setup

The database layer was implemented using PostgreSQL hosted on Neon Cloud.

Steps completed:

- Created a Neon PostgreSQL project.
- Connected Prisma ORM to the database.
- Defined the database schema.
- Created version-controlled Prisma migrations.
- Seeded the initial admin account.
- Verified database tables using Prisma Studio.

#### Database Schema

**Admin**
- id
- email
- password (bcrypt hash)
- createdAt
- updatedAt

**Lead**
- id
- name
- email
- budget
- message
- status
- createdAt
- updatedAt

---

### Phase 4 — Backend Development

Implemented REST APIs for the complete lead management workflow.

Public APIs:
- Health check endpoint
- Lead submission endpoint

Protected Admin APIs:
- Admin login
- Dashboard statistics
- Lead listing
- Search
- Pagination
- Status updates

Security features implemented:
- JWT authentication
- Password hashing using bcrypt
- Protected middleware
- Request validation
- Centralized error handling
- Rate limiting

---

### Phase 5 — Frontend Development

Developed a clean SaaS-inspired user interface.

Public Pages:
- Landing page
- Hero section
- Features section
- Lead submission form
- Footer

Admin Pages:
- Login page
- Dashboard
- Statistics cards
- Lead table
- Search
- Status filter
- Pagination

Additional UI features:
- Toast notifications
- Loading states
- Empty states
- Responsive layouts
- Protected routes

---

### Phase 6 — Production Hardening

Before deployment, the application was improved for production readiness.

Implemented:
- Secure HTTP headers using Helmet
- Environment variable validation
- Strong JWT secret validation
- Better API error handling
- Status confirmation before closing leads
- Improved mobile responsiveness
- Accessibility improvements
- Cleaner logging
- API request cancellation to prevent stale updates

---

### Phase 7 — Deployment

The application was deployed using separate services for each layer.

**Database**
- Neon PostgreSQL

**Backend**
- Render
- Configured production environment variables
- Connected Prisma with Neon
- Verified live API health endpoint

**Frontend**
- Vercel
- Configured `VITE_API_URL`
- Connected frontend with deployed backend
- Updated backend CORS configuration
- Verified the application in a fresh browser

---

### Phase 8 — Testing

The complete application was tested locally as well as after deployment.

Verified functionality includes:

- Landing page rendering
- Responsive design
- Client-side validation
- Server-side validation
- Lead submission
- Database persistence
- Admin authentication
- JWT authorization
- Dashboard statistics
- Search functionality
- Status updates
- Pagination
- Logout
- Protected routes
- Live deployment on Vercel and Render

---

### Key Learnings

Throughout this project, I gained practical experience in:

- Designing a full-stack application architecture
- Building REST APIs with Express.js
- Managing PostgreSQL databases using Prisma ORM
- Implementing JWT-based authentication
- Secure password hashing with bcrypt
- Client-side and server-side validation
- Production deployment using Render and Vercel
- Environment variable management
- Debugging deployment and CORS issues
- Building reusable React components
- Organizing scalable project structures

## Project Structure

```
LeadDesk-Mini/
├── client/                 # Vite React SPA
│   └── src/
│       ├── assets/
│       ├── components/     # UI building blocks (Button, Input, Badge, Toast…)
│       ├── pages/          # Landing, Login, AdminDashboard
│       ├── hooks/          # useAuth, useLeads, useDebounce…
│       ├── services/       # Axios API layer (one place for HTTP)
│       ├── context/        # AuthContext
│       ├── layouts/        # PublicLayout, AdminLayout
│       └── utils/          # helpers, constants, formatters
├── server/
│   ├── config/             # env, db client, cors origins
│   ├── controllers/        # thin request handlers
│   ├── middleware/         # auth, errorHandler, rateLimit
│   ├── models/             # optional; with Prisma this can stay thin/empty
│   ├── prisma/             # schema.prisma + migrations + seed
│   ├── routes/             # /api/auth, /api/leads, /api/admin
│   ├── utils/              # jwt helpers, asyncHandler
│   └── validations/        # express-validator chains
└── README.md

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

---
## Database Design 
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

## Deployment Architecture
                Users
                  │
                  ▼
        Vercel (React Frontend)
                  │
        HTTPS API Requests
                  │
                  ▼
       Render (Express Backend)
                  │
            Prisma ORM
                  │
                  ▼
      Neon PostgreSQL Database

## Challenges Faced

Examples:

Configuring Prisma with Neon PostgreSQL
Environment variable management
CORS configuration during deployment
JWT authentication
Responsive dashboard layout
Deployment debugging on Render

Briefly explain how each was resolved.

## AI Usage

This is important because the task asked for it.

Example:

AI tools (Cursor AI and ChatGPT) were used to accelerate development, understand unfamiliar concepts, review architecture decisions, and troubleshoot deployment issues. I reviewed, modified, and tested all generated code manually, made implementation decisions myself (such as choosing PostgreSQL over MongoDB, API structure, UI improvements, and deployment configuration), and verified the application end-to-end before submission.

## Future Improvements

Email notifications after lead submission
Role-based authentication
Lead notes and comments
CSV export
Analytics dashboard
Dark mode
Docker support
Automated testing using Jest

## Scripts

Server

npm run dev — API with file watch
npm start — production start
npm run prisma:migrate — run migrations
npm run prisma:seed — seed admin user
npm run test:smoke — API smoke test (server must be running)

Client

npm run dev — Vite dev server
npm run build — production build
npm run preview — preview production build

## Demo

ADMIN
EMAIL=admin@leaddesk.local
PASSWORD=ChangeMe123!

Backend:
https://leaddesk-mini-api-9dib.onrender.com

Frontend:
https://lead-desk-mini-orcin.vercel.app/


## License

Built solely for the Digital Heroes Internship Evaluation Task.

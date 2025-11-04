# PrepDash (MERN)

Dark-themed placement prep dashboard with auth, practice test, and results.

## Stack
- Client: Vite + React + Tailwind + React Router
- Server: Node.js + Express + Mongoose + JWT
- DB: MongoDB Atlas

## Quick Start

1) Server
```bash
cd server
# set env vars
# Windows PowerShell example:
# $env:MONGODB_URI = "your mongodb+srv://..."
# $env:JWT_SECRET = "your-strong-secret"
# $env:PORT = 5000
npm i
npm run dev
```

2) Client
```bash
cd ../client
npm i
npm run dev
```

Open http://localhost:5173

The client expects API at `http://localhost:5000/api`. Override via `VITE_API_BASE` in a `.env` file under `client`.

## API
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET /api/questions?limit=5 (Bearer token required)
- POST /api/submit { answers: { [questionId]: index } } (Bearer token)

On first server start, questions are auto-seeded if none exist.

## Build
- Client: `npm run build` -> `dist/`
- Server: `npm start`

## Notes
- JWT stored in localStorage for simplicity (MVP). For production, consider secure cookies.
- UI styled with Tailwind in a dark theme with blue/pink accents.



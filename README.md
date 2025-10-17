# Bob's Corn - Fullstack Rate Limiter Challenge

This repository contains a small fullstack project to solve the "Bob's Corn" challenge.

- `backend`: a minimal NestJS app exposing POST `/buy` and GET `/stats/:clientId`. It implements a simple in-memory rate limiter that allows at most 1 corn per client per minute.
- `frontend`: a Vite + React + Tailwind app that lets clients buy corn by entering a client id and clicking a button. It shows success/failure and total corn bought.

Quick start (Windows PowerShell)

1) Backend

Open a PowerShell terminal in the `backend` folder and run:

```powershell
cd backend; npm install
npm run dev
```

The backend listens on http://localhost:3333.

2) Frontend

Open another PowerShell terminal in the `frontend` folder and run:

```powershell
cd frontend; npm install
npm run dev
```

The frontend will run by default on http://localhost:5173 and talk to the backend at http://localhost:3333. If your backend runs elsewhere, set the environment variable `VITE_API_BASE` before starting (PowerShell):

```powershell
$env:VITE_API_BASE = 'http://localhost:3333'; npm run dev
```

How it works

- Rate limiter: backend keeps an in-memory map of last purchase timestamps per client and a total counter. If a client attempts to buy again within 60 seconds, the server returns HTTP 429.
- Frontend: simple UI to enter `clientId`, buy, and fetch stats.

Notes

- This is a minimal demo. The backend uses in-memory storage — restarting the server resets counts. For production use, persist counters in a database or use a distributed rate-limiter (Redis, etc.).
- To run in production, build the backend (`npm run build`) and run `node dist/main.js`.
# Base-labs-Challenge
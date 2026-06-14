# Pokédex — Frontend

A modern, responsive Pokédex built with **Next.js (App Router)** and **Material UI**.
Browse, search, filter, compare and favorite 386 Pokémon. Backed by a
[Spring Boot + PostgreSQL API](https://github.com/Segnit11/Backend_Pokedex).

## Features

- 🔍 **Search** by name, **filter** by type and generation, **sort** by number/name/height/weight
- 🃏 Type-colored cards, artwork, and rich **detail pages** with animated base-stat bars
- 🧬 **Evolution chains** (artwork + evolve conditions), sourced live from PokeAPI
- ⚖️ **Compare** up to 4 Pokémon side-by-side
- ❤️ **Favorites** saved per user (via the backend), with **Clerk** authentication
- 🌙 **Dark mode**, loading skeletons, empty states, fully responsive

## Run locally

This is the **frontend**. It needs the
[Spring Boot + PostgreSQL backend](https://github.com/Segnit11/Backend_Pokedex)
running too. Use **two terminals**.

### 1. Backend (→ http://localhost:8081)

Clone and start the backend repo — no local Java/Postgres needed, it all runs in
Docker and auto-seeds 386 Pokémon on first boot:

```bash
git clone https://github.com/Segnit11/Backend_Pokedex.git
cd Backend_Pokedex
docker compose up --build     # API on http://localhost:8081
```

Verify: `curl http://localhost:8081/api/health` → `{"status":"UP"}`

### 2. Frontend (this repo → http://localhost:3000)

```bash
npm install
cp .env.example .env.local    # then fill in the values (see below)
npm run dev                   # http://localhost:3000
```

The bundled defaults already point `NEXT_PUBLIC_API_URL` at `http://localhost:8081`.
Clerk auth is optional — leave its keys blank to run in public mode.

## Environment variables

See [`.env.example`](./.env.example):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API (e.g. `http://localhost:8081`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (leave blank to run in public mode) |
| `CLERK_SECRET_KEY` | Clerk secret key |

> Auth is **optional**: with no Clerk key the app runs fully in public mode
> (sign-in hidden, favorites disabled).

## Deploying to Vercel

1. Import this repo into Vercel (or `vercel --prod` from the project root).
2. Set the environment variables above in the Vercel project settings —
   `NEXT_PUBLIC_API_URL` pointing at your deployed backend.
3. Deploy.

## Tech stack

Next.js 14 · React 18 · Material UI · Clerk · Axios — deployed on Vercel.

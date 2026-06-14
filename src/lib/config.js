// Central place for runtime configuration.

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

// Auth is enabled only when a Clerk publishable key is provided. This lets the
// app run fully (in public mode) without any Clerk setup.
export const authEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

export const PAGE_SIZE = 12;

// Official artwork looks best; fall back to the basic sprite if it 404s.
export const artwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const sprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

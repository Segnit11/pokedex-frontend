// Thin API client for the Spring Boot backend. Every Pokemon is normalized to
// carry an `imageUrl` so components don't each rebuild sprite URLs.

import { API_URL, artwork } from "./config";

const withImage = (p) => ({ ...p, imageUrl: artwork(p.id) });

async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status}) for ${path}`);
  return res.json();
}

// Paged + filtered list. Returns { content, totalPages, totalElements, number }.
export async function fetchPokemonPage({
  name = "",
  type = "",
  generation = "",
  sortBy = "id",
  sortDir = "asc",
  page = 0,
  size = 12,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    sortDir,
  });
  if (name) params.set("name", name);
  if (type) params.set("type", type);
  if (generation) params.set("generation", String(generation));

  const data = await getJSON(`/api/pokemon/filter?${params.toString()}`);
  return { ...data, content: (data.content || []).map(withImage) };
}

export async function fetchMetadata() {
  try {
    return await getJSON(`/api/pokemon/metadata`);
  } catch {
    return { types: [], generations: [] };
  }
}

export async function fetchPokemonById(id) {
  const list = await getJSON(`/api/pokemon/findByID/${id}`);
  const first = Array.isArray(list) ? list[0] : list;
  return first ? withImage(first) : null;
}

// --- Favorites (require a Clerk userId) ---

export async function fetchFavorites(userId) {
  const list = await getJSON(`/api/favorites?userId=${encodeURIComponent(userId)}`);
  return (list || []).map(withImage);
}

export async function fetchFavoriteIds(userId) {
  try {
    return await getJSON(`/api/favorites/ids?userId=${encodeURIComponent(userId)}`);
  } catch {
    return [];
  }
}

export async function addFavorite(userId, pokemonId) {
  const res = await fetch(`${API_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, pokemonId }),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
}

export async function removeFavorite(userId, pokemonId) {
  const res = await fetch(
    `${API_URL}/api/favorites?userId=${encodeURIComponent(userId)}&pokemonId=${pokemonId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to remove favorite");
}

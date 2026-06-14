"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  fetchFavoriteIds,
  addFavorite as apiAdd,
  removeFavorite as apiRemove,
} from "@/lib/api";

const FavoritesContext = createContext(null);
export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ userId, children }) {
  const [ids, setIds] = useState(() => new Set());
  const signedIn = Boolean(userId);

  // Load the user's favorite ids whenever they sign in / out.
  useEffect(() => {
    let active = true;
    if (!userId) {
      setIds(new Set());
      return;
    }
    fetchFavoriteIds(userId).then((list) => {
      if (active) setIds(new Set(list));
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const isFavorite = useCallback((id) => ids.has(id), [ids]);

  // Returns false if the user needs to sign in first.
  const toggleFavorite = useCallback(
    async (pokemonId) => {
      if (!userId) return false;
      const next = new Set(ids);
      const wasFav = next.has(pokemonId);
      // Optimistic update.
      if (wasFav) next.delete(pokemonId);
      else next.add(pokemonId);
      setIds(next);
      try {
        if (wasFav) await apiRemove(userId, pokemonId);
        else await apiAdd(userId, pokemonId);
      } catch {
        // Roll back on failure.
        setIds((cur) => {
          const revert = new Set(cur);
          if (wasFav) revert.add(pokemonId);
          else revert.delete(pokemonId);
          return revert;
        });
      }
      return true;
    },
    [ids, userId]
  );

  return (
    <FavoritesContext.Provider
      value={{ ids, count: ids.size, signedIn, userId, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const CompareContext = createContext(null);
export const useCompare = () => useContext(CompareContext);

const MAX = 4;

export function CompareProvider({ children }) {
  const [items, setItems] = useState([]); // array of pokemon objects

  const has = useCallback((id) => items.some((p) => p.id === id), [items]);

  const toggle = useCallback((pokemon) => {
    setItems((cur) => {
      if (cur.some((p) => p.id === pokemon.id)) {
        return cur.filter((p) => p.id !== pokemon.id);
      }
      if (cur.length >= MAX) return cur; // ignore beyond the max
      return [...cur, pokemon];
    });
  }, []);

  const remove = useCallback((id) => setItems((cur) => cur.filter((p) => p.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, max: MAX, has, toggle, remove, clear }),
    [items, has, toggle, remove, clear]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

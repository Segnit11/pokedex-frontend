"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Typography, Skeleton, Card } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PokemonCard from "./PokemonCard";
import FiltersBar from "./FiltersBar";
import Pagination from "./Pagination";
import { fetchPokemonPage, fetchMetadata } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/config";

const DEFAULT_FILTERS = { name: "", type: "", generation: "", sort: "id-asc" };

const PokemonGrid = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [metadata, setMetadata] = useState({ types: [], generations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load filter options once.
  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    const [sortBy, sortDir] = filters.sort.split("-");
    try {
      const res = await fetchPokemonPage({
        name: filters.name,
        type: filters.type,
        generation: filters.generation,
        sortBy,
        sortDir,
        page,
        size: PAGE_SIZE,
      });
      setData(res);
    } catch (e) {
      setError(true);
      setData({ content: [], totalPages: 0, totalElements: 0 });
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    load();
  }, [load]);

  const updateFilters = (patch) => {
    setPage(0);
    setFilters((f) => ({ ...f, ...patch }));
  };

  const reset = () => {
    setPage(0);
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
      <FiltersBar filters={filters} metadata={metadata} onChange={updateFilters} onReset={reset} />

      {!loading && !error && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
          {data.totalElements} Pokémon found
        </Typography>
      )}

      {error && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6">Couldn’t reach the Pokédex API.</Typography>
          <Typography color="text.secondary">
            Make sure the backend is running and NEXT_PUBLIC_API_URL is set correctly.
          </Typography>
        </Box>
      )}

      {!error && (
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card sx={{ borderRadius: 4 }}>
                    <Skeleton variant="rectangular" height={170} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton width="60%" sx={{ mx: "auto" }} />
                      <Skeleton width="40%" sx={{ mx: "auto" }} />
                    </Box>
                  </Card>
                </Grid>
              ))
            : data.content.map((pokemon) => (
                <Grid item xs={6} sm={4} md={3} key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
        </Grid>
      )}

      {!loading && !error && data.content.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <SearchOffIcon sx={{ fontSize: 64, opacity: 0.5 }} />
          <Typography variant="h6">No Pokémon match your filters.</Typography>
          <Typography>Try clearing the search or filters.</Typography>
        </Box>
      )}

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPrevious={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => Math.min(p + 1, data.totalPages - 1))}
      />
    </Box>
  );
};

export default PokemonGrid;

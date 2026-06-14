"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Button, CircularProgress } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchFavorites } from "@/lib/api";
import { authEnabled } from "@/lib/config";
import PokemonCard from "./PokemonCard";

const FavoritesView = () => {
  const fav = useFavorites();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Re-fetch whenever the set of favorite ids changes (add/remove).
  const idsKey = fav ? Array.from(fav.ids).sort().join(",") : "";

  useEffect(() => {
    let active = true;
    if (!fav?.signedIn) {
      setLoading(false);
      setList([]);
      return;
    }
    setLoading(true);
    fetchFavorites(fav.userId)
      .then((data) => active && setList(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [fav?.signedIn, fav?.userId, idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const EmptyState = ({ title, subtitle, cta }) => (
    <Box sx={{ textAlign: "center", py: 10, color: "text.secondary" }}>
      <FavoriteBorderIcon sx={{ fontSize: 72, opacity: 0.4 }} />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ mb: 3 }}>{subtitle}</Typography>
      {cta}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5, minHeight: "60vh" }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Your favorites
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Pokémon you’ve saved, synced to your account.
      </Typography>

      {!authEnabled ? (
        <EmptyState
          title="Favorites need authentication"
          subtitle="Set up Clerk keys to enable sign-in and saving favorites."
          cta={
            <Button component={Link} href="/pokemons" variant="contained">
              Browse Pokédex
            </Button>
          }
        />
      ) : !fav?.signedIn ? (
        <EmptyState
          title="Sign in to see your favorites"
          subtitle="Save Pokémon from any card and find them here."
          cta={
            <Button component={Link} href="/pokemons" variant="contained">
              Browse Pokédex
            </Button>
          }
        />
      ) : loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : list.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          subtitle="Tap the heart on any Pokémon to add it here."
          cta={
            <Button component={Link} href="/pokemons" variant="contained">
              Find Pokémon
            </Button>
          }
        />
      ) : (
        <Grid container spacing={3}>
          {list.map((pokemon) => (
            <Grid item xs={6} sm={4} md={3} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesView;

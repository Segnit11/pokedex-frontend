"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Stack,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StraightenIcon from "@mui/icons-material/Straighten";
import ScaleIcon from "@mui/icons-material/Scale";
import Link from "next/link";
import { fetchPokemonById } from "@/lib/api";
import { typeGradient } from "@/lib/typeColors";
import { GEN_LABELS } from "@/lib/typeColors";
import TypeBadge from "./TypeBadge";
import StatBars from "./StatBars";
import FavoriteButton from "./FavoriteButton";
import PokemonImage from "./PokemonImage";
import EvolutionChain from "./EvolutionChain";

const pad = (n) => `#${String(n).padStart(3, "0")}`;
const MAX_ID = 386;

const PokemonDetails = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    fetchPokemonById(id)
      .then((p) => {
        if (!active) return;
        if (p) setPokemon(p);
        else setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !pokemon) {
    return (
      <Container sx={{ textAlign: "center", py: 12 }}>
        <Typography variant="h5">Pokémon not found.</Typography>
        <Button component={Link} href="/pokemons" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Pokédex
        </Button>
      </Container>
    );
  }

  const types = pokemon.types || [];
  const abilities = pokemon.abilities || [];
  const eggGroups = pokemon.egg_groups || [];
  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < MAX_ID ? id + 1 : null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button component={Link} href="/pokemons" startIcon={<ArrowBackIcon />} color="inherit">
          Back
        </Button>
        <Stack direction="row" spacing={1}>
          <IconButton component={Link} href={prevId ? `/pokemons/${prevId}` : "#"} disabled={!prevId}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton component={Link} href={nextId ? `/pokemons/${nextId}` : "#"} disabled={!nextId}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Card sx={{ borderRadius: 5, overflow: "hidden" }} className="fade-in-up">
        {/* Hero */}
        <Box sx={{ background: typeGradient(types), color: "#fff", p: 4, position: "relative" }}>
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
            <FavoriteButton pokemonId={pokemon.id} />
          </Box>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ opacity: 0.85 }}>
                {pad(pokemon.id)}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, textTransform: "capitalize" }}>
                {pokemon.name}
              </Typography>
              {pokemon.genus && <Typography sx={{ opacity: 0.9 }}>{pokemon.genus}</Typography>}
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {types.map((t) => (
                  <TypeBadge key={t.type_id ?? t.type} type={t.type} size="medium" />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
              <PokemonImage id={pokemon.id} name={pokemon.name} size={240} priority />
            </Grid>
          </Grid>
        </Box>

        {/* Body */}
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          {pokemon.description && (
            <Typography sx={{ mb: 3, fontStyle: "italic", color: "text.secondary" }}>
              “{pokemon.description}”
            </Typography>
          )}

          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <InfoTile icon={<StraightenIcon />} label="Height" value={`${(pokemon.height / 10).toFixed(1)} m`} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <InfoTile icon={<ScaleIcon />} label="Weight" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoTile
                label="Generation"
                value={GEN_LABELS[pokemon.generation] || (pokemon.generation ? `Gen ${pokemon.generation}` : "—")}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Base stats
          </Typography>
          <StatBars stat={pokemon.stat} />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Evolution
          </Typography>
          <EvolutionChain id={pokemon.id} />

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Abilities
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {abilities.map((a) => (
                  <Chip key={a.abilityId ?? a.ability} label={a.ability} sx={{ textTransform: "capitalize" }} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Egg groups
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {eggGroups.map((e) => (
                  <Chip key={e.egg_group_id ?? e.egg_group} label={e.egg_group} variant="outlined" sx={{ textTransform: "capitalize" }} />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

const InfoTile = ({ icon, label, value }) => (
  <Box sx={{ p: 2, borderRadius: 3, bgcolor: "action.hover", textAlign: "center", height: "100%" }}>
    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center" sx={{ color: "text.secondary" }}>
      {icon}
      <Typography variant="caption">{label}</Typography>
    </Stack>
    <Typography sx={{ fontWeight: 700, mt: 0.5 }}>{value}</Typography>
  </Box>
);

export default PokemonDetails;

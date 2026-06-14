"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const Hero = () => (
  <Box
    sx={{
      background: "linear-gradient(135deg, #DC0A2D 0%, #3B4CCA 100%)",
      color: "#fff",
      py: { xs: 5, md: 7 },
      position: "relative",
      overflow: "hidden",
    }}
  >
    <CatchingPokemonIcon
      sx={{
        position: "absolute",
        right: -40,
        top: -40,
        fontSize: 280,
        opacity: 0.12,
        transform: "rotate(15deg)",
      }}
    />
    <Container maxWidth="md" sx={{ textAlign: "center", position: "relative" }}>
      <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1 }}>
        Pokédex
      </Typography>
      <Typography sx={{ mt: 1.5, opacity: 0.95, fontSize: { xs: 15, md: 18 } }}>
        Browse, search and filter 386 Pokémon across three generations. Build your
        favorites, compare stats, and explore every detail.
      </Typography>
    </Container>
  </Box>
);

export default Hero;

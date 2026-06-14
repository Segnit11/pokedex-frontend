"use client";
import React from "react";
import { Box, Container, Typography, Link as MuiLink, Stack } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const Footer = () => (
  <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", mt: 6, py: 4, bgcolor: "background.paper" }}>
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CatchingPokemonIcon sx={{ color: "primary.main" }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Pokédex
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
          Data from{" "}
          <MuiLink href="https://pokeapi.co" target="_blank" rel="noreferrer" underline="hover">
            PokeAPI
          </MuiLink>
          . Built with Next.js + Spring Boot. Pokémon © Nintendo / Game Freak.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;

"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Link from "next/link";
import { useColorMode } from "./providers/Providers";
import { useFavorites } from "@/context/FavoritesContext";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const { mode, toggle } = useColorMode();
  const fav = useFavorites();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Box
          component={Link}
          href="/pokemons"
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, fontWeight: 800, fontSize: 20 }}
        >
          <CatchingPokemonIcon sx={{ color: "primary.main" }} />
          Pokédex
        </Box>

        <Button
          component={Link}
          href="/favorites"
          startIcon={
            <Badge badgeContent={fav?.count || 0} color="primary">
              <FavoriteIcon />
            </Badge>
          }
          color="inherit"
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          Favorites
        </Button>
        <Tooltip title="Favorites">
          <IconButton component={Link} href="/favorites" color="inherit" sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <Badge badgeContent={fav?.count || 0} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
          <IconButton onClick={toggle} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        <AuthButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

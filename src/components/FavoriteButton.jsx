"use client";
import React, { useState } from "react";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SignInButton } from "@clerk/nextjs";
import { useFavorites } from "@/context/FavoritesContext";
import { authEnabled } from "@/lib/config";

// Heart toggle.
//  - signed in            -> toggles the favorite via the backend
//  - signed out + auth on  -> opens the Clerk sign-in modal
//  - auth not configured   -> shows an info toast
const FavoriteButton = ({ pokemonId, size = "medium" }) => {
  const fav = useFavorites();
  const [toast, setToast] = useState(false);
  const active = fav?.isFavorite(pokemonId);

  const heart = (title, onClick) => (
    <Tooltip title={title}>
      <IconButton onClick={onClick} size={size} sx={{ color: active ? "#DC0A2D" : "inherit" }}>
        {active ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );

  // Signed in: toggle directly.
  if (fav?.signedIn) {
    return heart(active ? "Remove favorite" : "Add to favorites", (e) => {
      e.preventDefault();
      e.stopPropagation();
      fav.toggleFavorite(pokemonId);
    });
  }

  // Signed out but Clerk is configured: clicking opens the sign-in modal.
  if (authEnabled) {
    return (
      <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <SignInButton mode="modal">
          {heart("Sign in to save favorites")}
        </SignInButton>
      </span>
    );
  }

  // Auth not configured at all.
  return (
    <>
      {heart("Sign in to save favorites", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setToast(true);
      })}
      <Snackbar
        open={toast}
        autoHideDuration={4000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" variant="filled" onClose={() => setToast(false)}>
          Authentication isn’t set up yet — add Clerk keys to enable favorites.
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteButton;

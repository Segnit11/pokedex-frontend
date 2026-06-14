"use client";
import React from "react";
import { Button, Stack } from "@mui/material";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { authEnabled } from "@/lib/config";

// Renders Clerk's sign-in / sign-up / user button, but only when auth is
// configured. In public mode (no Clerk key) nothing is rendered.
const AuthButtons = () => {
  if (!authEnabled) return null;
  return (
    <>
      <SignedOut>
        <Stack direction="row" spacing={1}>
          <SignInButton mode="modal">
            <Button variant="outlined" color="inherit" size="small">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="contained" color="primary" size="small">
              Sign up
            </Button>
          </SignUpButton>
        </Stack>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/pokemons" />
      </SignedIn>
    </>
  );
};

export default AuthButtons;

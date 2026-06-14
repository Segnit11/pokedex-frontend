"use client";
import React from "react";
import { Chip } from "@mui/material";
import { typeColor } from "@/lib/typeColors";

// A small colored pill for a Pokemon type.
const TypeBadge = ({ type, size = "small" }) => (
  <Chip
    label={type}
    size={size}
    sx={{
      bgcolor: typeColor(type),
      color: "#fff",
      fontWeight: 700,
      letterSpacing: 0.3,
      textTransform: "capitalize",
      border: "1px solid rgba(255,255,255,0.25)",
    }}
  />
);

export default TypeBadge;

"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Stack, Checkbox, Tooltip } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Link from "next/link";
import { typeColor, typeGradient } from "@/lib/typeColors";
import TypeBadge from "./TypeBadge";
import FavoriteButton from "./FavoriteButton";
import PokemonImage from "./PokemonImage";
import { useCompare } from "@/context/CompareContext";

const pad = (n) => `#${String(n).padStart(3, "0")}`;

const PokemonCard = ({ pokemon }) => {
  const compare = useCompare();
  const types = pokemon.types || [];
  const inCompare = compare?.has(pokemon.id);

  return (
    <Card
      className="fade-in-up"
      sx={{
        position: "relative",
        overflow: "visible",
        borderRadius: 4,
        "&:hover": { transform: "translateY(-6px)", boxShadow: 8 },
      }}
    >
      {/* Top actions */}
      <Box sx={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}>
        <FavoriteButton pokemonId={pokemon.id} size="small" />
      </Box>
      <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
        <Tooltip title={inCompare ? "Remove from compare" : "Add to compare"}>
          <Checkbox
            size="small"
            checked={Boolean(inCompare)}
            onChange={() => compare?.toggle(pokemon)}
            icon={<CompareArrowsIcon fontSize="small" />}
            checkedIcon={<CompareArrowsIcon fontSize="small" />}
            sx={{
              bgcolor: inCompare ? "primary.main" : "rgba(0,0,0,0.06)",
              color: inCompare ? "#fff" : "inherit",
              borderRadius: 2,
              "&.Mui-checked": { color: "#fff" },
              "&:hover": { bgcolor: inCompare ? "primary.dark" : "rgba(0,0,0,0.12)" },
            }}
          />
        </Tooltip>
      </Box>

      <Link href={`/pokemons/${pokemon.id}`}>
        {/* Type-colored hero with the artwork */}
        <Box
          sx={{
            background: typeGradient(types),
            borderRadius: "16px 16px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 4,
            pb: 1,
            position: "relative",
          }}
        >
          <PokemonImage id={pokemon.id} name={pokemon.name} size={140} />
        </Box>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1 }}>
            {pad(pokemon.id)}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, textTransform: "capitalize" }}>
            {pokemon.name}
          </Typography>
          {pokemon.genus && (
            <Typography variant="caption" color="text.secondary">
              {pokemon.genus}
            </Typography>
          )}
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1.5 }}>
            {types.map((t) => (
              <TypeBadge key={t.type_id ?? t.type} type={t.type} />
            ))}
          </Stack>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;

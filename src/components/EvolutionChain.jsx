"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Avatar, Chip, Skeleton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { fetchEvolutionChain } from "@/lib/pokeapi";
import { artwork } from "@/lib/config";

const MAX_ID = 386; // ids we have in our own dataset (links stay in-app for these)

// A single evolution node: artwork + name, clickable when it's in our Pokédex.
const Stage = ({ stage, isCurrent }) => {
  const inDex = stage.id <= MAX_ID;
  const content = (
    <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 140 }}>
      <Avatar
        src={artwork(stage.id)}
        alt={stage.name}
        sx={{
          width: { xs: 110, sm: 140 },
          height: { xs: 110, sm: 140 },
          bgcolor: "action.hover",
          border: isCurrent ? "4px solid" : "4px solid transparent",
          borderColor: isCurrent ? "primary.main" : "transparent",
          transition: "transform .15s ease",
          "&:hover": { transform: inDex ? "scale(1.08)" : "none" },
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: isCurrent ? 800 : 600, textTransform: "capitalize" }}>
        {stage.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        #{String(stage.id).padStart(3, "0")}
      </Typography>
    </Stack>
  );

  return inDex ? (
    <Box component={Link} href={`/pokemons/${stage.id}`}>
      {content}
    </Box>
  ) : (
    content
  );
};

const EvolutionChain = ({ id }) => {
  const [stages, setStages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchEvolutionChain(id)
      .then((s) => active && setStages(s))
      .catch(() => active && setStages([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ py: 2 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} variant="circular" width={140} height={140} />
        ))}
      </Stack>
    );
  }

  // A single-stage chain means the Pokemon doesn't evolve — hide the section.
  if (!stages || stages.length <= 1) {
    return (
      <Typography color="text.secondary" variant="body2">
        This Pokémon does not evolve.
      </Typography>
    );
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      useFlexGap
      sx={{ py: 1 }}
    >
      {stages.map((stage, i) => (
        <React.Fragment key={stage.id}>
          {i > 0 && (
            <Stack alignItems="center" sx={{ color: "text.secondary", mx: 0.5 }}>
              <ArrowForwardIcon fontSize="small" />
              {stage.from && <Chip label={stage.from} size="small" variant="outlined" sx={{ mt: 0.5 }} />}
            </Stack>
          )}
          <Stage stage={stage} isCurrent={stage.id === id} />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default EvolutionChain;

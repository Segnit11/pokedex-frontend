"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { GEN_LABELS } from "@/lib/typeColors";

const SORTS = [
  { value: "id-asc", label: "Number (low → high)" },
  { value: "id-desc", label: "Number (high → low)" },
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "height-desc", label: "Tallest" },
  { value: "weight-desc", label: "Heaviest" },
];

const FiltersBar = ({ filters, metadata, onChange, onReset }) => {
  // Local search text so we can debounce before hitting the API.
  const [text, setText] = useState(filters.name);

  useEffect(() => setText(filters.name), [filters.name]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (text !== filters.name) onChange({ name: text });
    }, 400);
    return () => clearTimeout(t);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasActive =
    filters.name || filters.type || filters.generation || filters.sort !== "id-asc";

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search Pokémon by name…"
        size="small"
        sx={{ minWidth: 260, flex: "1 1 260px", maxWidth: 360 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: text ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setText("")}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      <TextField
        select
        size="small"
        label="Type"
        value={filters.type}
        onChange={(e) => onChange({ type: e.target.value })}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">All types</MenuItem>
        {(metadata.types || []).map((t) => (
          <MenuItem key={t} value={t} sx={{ textTransform: "capitalize" }}>
            {t}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Generation"
        value={filters.generation}
        onChange={(e) => onChange({ generation: e.target.value })}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All generations</MenuItem>
        {(metadata.generations || []).map((g) => (
          <MenuItem key={g} value={g}>
            {GEN_LABELS[g] || `Gen ${g}`}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Sort by"
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        sx={{ minWidth: 190 }}
      >
        {SORTS.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>

      {hasActive && (
        <Button variant="text" color="inherit" startIcon={<ClearIcon />} onClick={onReset}>
          Reset
        </Button>
      )}
    </Box>
  );
};

export default FiltersBar;

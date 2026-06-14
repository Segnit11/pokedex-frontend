"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  IconButton,
  Button,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useCompare } from "@/context/CompareContext";
import { artwork } from "@/lib/config";
import TypeBadge from "./TypeBadge";

const STAT_ROWS = [
  ["hp", "HP"],
  ["attack", "Attack"],
  ["defense", "Defense"],
  ["special_attack", "Sp. Atk"],
  ["special_defense", "Sp. Def"],
  ["speed", "Speed"],
];

// Highlights the highest value in each stat row across the compared Pokemon.
const bestInRow = (items, key) => Math.max(...items.map((p) => p.stat?.[key] || 0));

const CompareTray = () => {
  const compare = useCompare();
  const [open, setOpen] = useState(false);
  const items = compare?.items || [];

  if (items.length === 0) return null;

  const total = (p) => STAT_ROWS.reduce((s, [k]) => s + (p.stat?.[k] || 0), 0);

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1200,
          px: 2,
          py: 1.5,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          gap: 2,
          maxWidth: "95vw",
        }}
      >
        <Stack direction="row" spacing={1}>
          {items.map((p) => (
            <Badge
              key={p.id}
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <IconButton
                  size="small"
                  onClick={() => compare.remove(p.id)}
                  sx={{ bgcolor: "background.paper", boxShadow: 1, width: 18, height: 18 }}
                >
                  <CloseIcon sx={{ fontSize: 12 }} />
                </IconButton>
              }
            >
              <Avatar src={artwork(p.id)} alt={p.name} sx={{ width: 48, height: 48, bgcolor: "action.hover" }} />
            </Badge>
          ))}
        </Stack>
        <Button
          variant="contained"
          startIcon={<CompareArrowsIcon />}
          disabled={items.length < 2}
          onClick={() => setOpen(true)}
        >
          Compare ({items.length})
        </Button>
        <Button color="inherit" size="small" onClick={() => compare.clear()}>
          Clear
        </Button>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Compare Pokémon
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                {items.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Avatar src={artwork(p.id)} alt={p.name} sx={{ width: 64, height: 64, mx: "auto", bgcolor: "action.hover" }} />
                    <Typography sx={{ fontWeight: 700, textTransform: "capitalize" }}>{p.name}</Typography>
                    <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mt: 0.5 }}>
                      {(p.types || []).map((t) => (
                        <TypeBadge key={t.type_id ?? t.type} type={t.type} />
                      ))}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {STAT_ROWS.map(([key, label]) => {
                const best = bestInRow(items, key);
                return (
                  <TableRow key={key}>
                    <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>{label}</TableCell>
                    {items.map((p) => {
                      const v = p.stat?.[key] || 0;
                      return (
                        <TableCell key={p.id} align="center" sx={{ fontWeight: v === best ? 800 : 400, color: v === best ? "primary.main" : "inherit" }}>
                          {v}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Total</TableCell>
                {items.map((p) => {
                  const t = total(p);
                  const bestTotal = Math.max(...items.map(total));
                  return (
                    <TableCell key={p.id} align="center" sx={{ fontWeight: 800, color: t === bestTotal ? "primary.main" : "inherit" }}>
                      {t}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompareTray;

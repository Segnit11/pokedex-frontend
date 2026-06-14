"use client";
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

// Maps the backend stat object to labeled, colored progress bars.
const STAT_META = [
  { key: "hp", label: "HP", color: "#FF5959" },
  { key: "attack", label: "Attack", color: "#F5AC78" },
  { key: "defense", label: "Defense", color: "#FAE078" },
  { key: "special_attack", label: "Sp. Atk", color: "#9DB7F5" },
  { key: "special_defense", label: "Sp. Def", color: "#A7DB8D" },
  { key: "speed", label: "Speed", color: "#FA92B2" },
];

const MAX_STAT = 200; // visual ceiling for the bars

const StatBars = ({ stat }) => {
  if (!stat) return null;
  const total = STAT_META.reduce((sum, m) => sum + (stat[m.key] || 0), 0);

  return (
    <Box>
      {STAT_META.map((m) => {
        const value = stat[m.key] || 0;
        return (
          <Box key={m.key} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ width: 80, color: "text.secondary", fontWeight: 600 }}>
              {m.label}
            </Typography>
            <Typography variant="body2" sx={{ width: 36, textAlign: "right", fontWeight: 700 }}>
              {value}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((value / MAX_STAT) * 100, 100)}
              sx={{
                flexGrow: 1,
                height: 10,
                borderRadius: 5,
                bgcolor: "action.hover",
                "& .MuiLinearProgress-bar": { bgcolor: m.color, borderRadius: 5 },
              }}
            />
          </Box>
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          Total
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          {total}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBars;

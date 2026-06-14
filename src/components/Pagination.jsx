"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  if (totalPages <= 1) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, my: 5 }}>
      <Button
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        onClick={onPrevious}
        disabled={currentPage === 0}
      >
        Previous
      </Button>
      <Typography variant="body2" color="text.secondary">
        Page <strong>{currentPage + 1}</strong> of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        endIcon={<ChevronRightIcon />}
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;

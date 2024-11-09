import React from 'react';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';
const Pagination = ({ currentPage, totalPages, onPreviousPage, onNextPage }) => {
  return (
   
      <Box sx={{display: 'flex', justifyContent:'space-between', marginTop:'50px', marginBottom:'25px', paddingX:'170px'}}>
        <Button variant='outlined' onClick={onPreviousPage} disabled={currentPage === 0}>Previous</Button>
        <p>Page {currentPage + 1} of {totalPages}</p>
        <Button variant='outlined' onClick={onNextPage} disabled={currentPage === totalPages - 1}>Next</Button>
      </Box>
    
  );
};

export default Pagination;

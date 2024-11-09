'use client'
import React, { useState, useEffect} from "react";
import { IconButton } from "@mui/material";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AZFilter from "./AZFilter";
import {useUser, UserButton} from '@clerk/nextjs'

const Filters = ({ onSearch }) => {

  const [searchName, setSearchName] = useState('');

  const {user, isLoaded} = useUser();

  const handleSearch = () => {
    onSearch(searchName); // Invoke the callback function with the search name
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginLeft:'10px', marginTop: '25px', marginBottom: '25px' }}>
      <Box sx={{ width: 500, maxWidth: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <TextField
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            fullWidth
            label="Search for Pokemons"
            id="fullWidth"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={handleKeyDown}
          />
      </Box>
      {isLoaded && user && <>
        <UserButton afterSignInUrl="/pokemons"/>
      </>}
    </div>
  );
};

export default Filters;

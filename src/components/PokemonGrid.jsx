'use client'
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import fetchPokemonData from '@/services/fetchPokemonData';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Filters from './Filters';
import {useUser} from '@clerk/nextjs'
import AZFilter from './AZFilter';

const PokemonGrid = () => {
  //to check wether user is authenticated
  const {user, isloaded} = useUser();

  // State for storing Pokémon data, current page, and total pages
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Fetch Pokémon data when component mounts, currentPage changes, or searchName changes
  useEffect(() => {
    fetchPokemonData(currentPage, searchName, sortOrder, setPokemonData, setTotalPages);
  }, [currentPage, searchName]);

  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Function to handle going to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };


  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    console.log(newSortOrder)
  };
  const handleSearch = async (name) => {
    setSearchName(name);
    setCurrentPage(0); // Reset to the first page when searching
  };

  return (
    <div>
      {/* <AZFilter onFilterChange={handleSortChange}/> */}
      <Filters onSearch={handleSearch} />
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Box sx={{width:'60%', display:'flex', justifyContent:'center'}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: '80%' }}>
            {pokemonData.map((pokemon) => (
              <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
                  <PokemonCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default PokemonGrid;


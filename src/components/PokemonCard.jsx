'use client';
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={pokemon.imageUrl}
        title={pokemon.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {pokemon.name}
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/pokemons/${pokemon.name}`} passHref>
            <Button variant="contained">Details</Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
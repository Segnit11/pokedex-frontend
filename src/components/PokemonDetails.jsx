import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fetchPokemonDetails from '@/services/fetchPokemonDetails'; // Adjust the import path as needed
import {Box, Card, CardContent, CardMedia, Typography, Stack, Button} from '@mui/material';
import Link from 'next/link';
import CircularProgress from '@mui/material';

const PokemonDetails = ({ pokemonName }) => {

  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const details = await fetchPokemonDetails(pokemonName);
        console.log(details)
        setPokemonDetails(details);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    getPokemonDetails();
  }, [pokemonName]);

  console.log(pokemonDetails)

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box style={{ display: 'flex'}}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/pokemons`} passHref>
            <Button variant="contained">Back</Button>
          </Link>
    </Box>
    <div style={{ justifyContent: 'center', alignItems:'center', marginLeft:100}}>
      <Card sx={{ maxWidth:1000, justifyContent: 'center', alignItems:'center' }}> 
          {pokemonDetails.map((pokemon) => ( <div>
            <Typography variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center',  fontFamily: 'Roboto, sans-serif', marginTop:25}}>{pokemon.id}. {pokemon.name}</Typography>
            <hr></hr>
            <CardMedia sx={{ height: 600 }}image={pokemon.imageUrl} title={pokemon.name}></CardMedia>
            <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Typography><CardMedia sx={{ height: 50, width:50, objectFit:'contain'}}image="/heighticon.png"title={pokemon.name}></CardMedia> <strong>Height:</strong> {pokemon.height}</Typography>
              <Typography><CardMedia sx={{ height: 50, width:50, objectFit:'contain'}}image="/weight.png"title={pokemon.name}></CardMedia><strong>Weight:</strong> {pokemon.weight}</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                  {Object.entries(pokemon.stat).map(([key, value], index) => (
                    <Typography key={index} variant="body2" sx={{ mr: 2, mb: 1 }}>
                      <strong>{key.replace('_', ' ').toUpperCase()}</strong> : {value}
                    </Typography>
                  ))}
                </Box>
            </Stack>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Typography variant="body1" sx={{ margin: 1 }}>
                <strong>Types:</strong> {pokemon.types.map((type) => type.type).join(', ')}
              </Typography>
              <Typography variant="body1" sx={{ margin: 1 }}>
                <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability).join(', ')}
              </Typography>
              <Typography variant="body1" sx={{ margin: 1 }}>
                <strong>Egg Groups:</strong> {pokemon.egg_groups.map((egg_group) => egg_group.egg_group).join(', ')}
              </Typography>
          </Box>
              <Typography sx={{ border: '1px solid #ccc', padding: '8px',borderRadius: '4px', margin: '8px 0'}}><strong>Description:</strong>  {pokemon.description}</Typography>
            </CardContent>
          </div>))}
      </Card>
    </div>
    </Box>
  );
};
export default PokemonDetails;



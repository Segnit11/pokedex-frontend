'use client'
import React from "react";
import PokemonDetails from "@/components/PokemonDetails";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const pokemonName = ({params}) => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   // Redirect to the login page if the user is not authenticated
  //   router.push('/login');
  //   return null;
  // }
    const{pokemonName} = params;
    console.log(pokemonName)
    return (
      <div style={{ backgroundColor: '#D2B48C', minHeight: '100vh', padding: '20px' }}>
        {pokemonName && (
          <PokemonDetails pokemonName={pokemonName} />
        )}
      </div>
    );
  }
export default pokemonName;

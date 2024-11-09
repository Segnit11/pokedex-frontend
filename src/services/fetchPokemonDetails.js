const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/pokemon/findByName?name=${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const totalData = data.map(pokemon => ({
        ...pokemon,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
      }));
      return totalData
    } catch (error) {
      throw new Error(`Error fetching Pokemon details: ${error.message}`);
    }
  };
  
  export default fetchPokemonDetails
  
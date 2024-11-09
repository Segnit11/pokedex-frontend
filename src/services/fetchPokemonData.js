const fetchPokemonData = async (currentPage, searchName, sortOrder, setPokemonData, setTotalPages) => {
  console.log(currentPage);
   try {
    const url = `http://localhost:8080/api/pokemon/filter?name=${searchName}&page=${currentPage}&size=8`;

    const pokemonInfo = await fetch(url);
    if (!pokemonInfo.ok) {
      throw new Error('Failed to fetch data');
    }

    const pokemonData = await pokemonInfo.json();
    const totalData = pokemonData.content.map(pokemon => ({
      ...pokemon,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    }));

    if (sortOrder === 'nameAsc') {
      totalData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'nameDsc') {
      totalData.sort((a, b) => b.name.localeCompare(a.name));
    }

    setPokemonData(totalData);
    setTotalPages(pokemonData.totalPages);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
};


export default fetchPokemonData;



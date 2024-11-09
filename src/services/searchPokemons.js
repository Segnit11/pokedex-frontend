// const searchPokemons = async(name) =>{
//     try{
//         const search = await fetch(`http://localhost:8080/api/pokemon/findByName?name=${name}`);
//         if(!search.ok){
//             throw new error("Could not find pokemon")
//         }
//     }catch(error){
//         console.error('Error finding pokemon:', error);
//     }
// }
// export default searchPokemons;
const fetchPokemonData = async (currentPage, searchName, setPokemonData, setTotalPages) => {
    try {
        if (searchName) {
            url = `http://localhost:8080/api/pokemon/findByName?name=${searchName}`;
        }
        else{ url = `http://localhost:8080/api/pokemon?page=${currentPage}&size=8`;}

        const pokemonInfo = await fetch(url);
        console.log(pokemonInfo)
        if (!pokemonInfo.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const pokemonData = await pokemonInfo.json();
        const totalData = pokemonData.content.map(pokemon => ({
            ...pokemon,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
        }));
        
        console.log('totalData: ', totalData);
        setPokemonData(totalData);
        setTotalPages(pokemonData.totalPages);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
};

export default fetchPokemonData;

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [ type ] = types;

        pokemon.types = types;
        pokemon.type = type;

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) //faz a requisição, retorna a promisse resolvida ja convertendo em json
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json()) // resposta pra json
        .then((jsonBody) => jsonBody.results) // acessa o ./results
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // deu uma lista já em json de promisses
        .then((detailsRequests) => Promise.all(detailsRequests)) //resolve cada promisse retornando pro proximo then a lsta
        .then((pokemonsDetails) => pokemonsDetails) //retorna uma lista com detalhes dos pokemons
}

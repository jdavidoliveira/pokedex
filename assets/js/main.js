//funçao para transformar a primeira letra em maiuscula
function primeiraLetraMaiuscula(texto) {
    let primeiraLetra = texto.charAt(0).toUpperCase();
    let restoDoTexto = texto.slice(1).toLowerCase();
    return primeiraLetra + restoDoTexto;
}


//função pra converter o dado json em uma <li> HTML
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${primeiraLetraMaiuscula(pokemon.name)}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${primeiraLetraMaiuscula(type)}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>`;
}



const pokemonList = document.querySelector('#pokemonList');

pokeApi.getPokemons().then((pokemons = []) => {
    newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
})


const pokemonContainer = document.getElementById('pokemon-container');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortOrder = document.getElementById('sortOrder');
const searchButton = document.getElementById('searchButton');

function populateTypeFilter() {
    const types = new Set();

    pokemons.forEach(pokemon => {
        pokemon.type.forEach(type => types.add(type));
    });

    typeFilter.innerHTML = '<option value="all">All</option>';

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeFilter.appendChild(option);
    });
}

function displayPokemons(pokemons) {
    pokemonContainer.innerHTML = '';

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        const img = document.createElement('img');
        img.src = pokemon.img;
        img.alt = pokemon.name;
        card.appendChild(img);

        const name = document.createElement('h2');
        name.classList.add('pokemon-name');
        name.textContent = pokemon.name;
        card.appendChild(name);

        const type = document.createElement('p');
        type.classList.add('pokemon-type');
        type.textContent = `Type: ${pokemon.type.join(', ')}`;
        card.appendChild(type);

        pokemonContainer.appendChild(card);
    });
}

function filterAndDisplayPokemons() {
    let filteredPokemons = pokemons;

    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery)
        );
    }

    const selectedType = typeFilter.value;
    if (selectedType !== 'all') {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.type.includes(selectedType)
        );
    }

    if (sortOrder.value === 'a-z') {
        filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder.value === 'z-a') {
        filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayPokemons(filteredPokemons);
}

searchButton.addEventListener('click', filterAndDisplayPokemons);
typeFilter.addEventListener('change', filterAndDisplayPokemons);
sortOrder.addEventListener('change', filterAndDisplayPokemons);

populateTypeFilter();
displayPokemons(pokemons);

// let arr = [10, 47, -30, 3];

// let yigindi = arr.reduce((sum, currentValue) => {
//     return sum + currentValue
// }, 0);
// console.log(yigindi);
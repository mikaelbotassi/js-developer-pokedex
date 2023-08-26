const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

const fieldFunctions = () => {
    
    var modalButtons = document.querySelectorAll('[data-toggle="modal"]');

    modalButtons.forEach((el) => {
        el.addEventListener('click', (event) => {
            const modal = document.getElementById(event.target.dataset.target);
            modal.style.display="block";
            modal.querySelectorAll('[data-dismiss="modal"]').forEach((btn) =>
                btn.addEventListener('click', () => modal.style.display="none"))
        })
    });

}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
                <span class="number">
                    <span class="number-card">
                        <i class="fa-solid fa-hashtag"></i>
                        <span class="number-code">${pokemon.number}</span>
                    </span>
                </span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                
                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
                <a href="javascript:;" class="toggleModal" aria-label="show-pokemon" data-toggle="modal" data-target="pokemonModal${pokemon.number}"></a>
        </li>
        <div id="pokemonModal${pokemon.number}" class="modal">

            <div class="modal-content ${pokemon.type}">
              <div class="modal-header">
                <a href="javascript:;" data-dismiss="modal" class="text-decoration-none"><i class="fa-solid fa-arrow-left"></i></a>
              </div>
              <div class="modal-body">

                <div class="pokemon-style">
                    <div class="d-flex align-items-center justify-content-between text-white">
                        <div class="d-flex flex-column">
                            <h2 class="m-0">${pokemon.name}</h2>
                            <ul class="d-flex p-0 align-items-center gap-1 modal-pokemon-types">
                                ${pokemon.types.map((type) => `<li>${type}</li>`).join('')}
                            </ul>
                        </div>
                        <span>#1</span>
                    </div>
                    
                    <div class="modal-pokemon-img">
                        <img src="${pokemon.photo}" alt="bulbassaur" />
                    </div>
                </div>

                <div class="modal-details">
                    <h3 class="fs-3">About</h3>

                    <ul class="fs-4">
                        <li class="d-flex align-items-center gap-5">
                            <span>Species</span>
                            <span>${pokemon.species}</span>
                        </li>
                        <li class="d-flex align-items-center gap-5">
                            <span>Height</span>
                            <span>${pokemon.height}</span>
                        </li>
                        <li class="d-flex align-items-center gap-5">
                            <span>Weight</span>
                            <span>${pokemon.weight}</span>
                        </li>
                        <li class="d-flex align-items-center gap-5">
                            <span>Abilities</span>
                            <span>
                                ${pokemon.abilities.join(', ')}
                            </span>
                        </li>
                    </ul>

                </div>

              </div>

            </div>
          
        </div>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        fieldFunctions();
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
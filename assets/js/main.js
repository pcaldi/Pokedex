
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToli(pokemon) {
    return `
    
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
                
            </li>
    
    
    `
}

function loadPokemonItems(offset , limit){
    pokeApi.getPokemos(offset, limit).then((pokemons = []) => { 
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `) .join('')

        pokemonList.innerHTML += newHtml 
    })    
}
   

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{

        loadPokemonItems(offset, limit)
    }


})

/*
    const listItems = []
    
       for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToli(pokemon)
        )
    }
        console.log(listItems)    
    */
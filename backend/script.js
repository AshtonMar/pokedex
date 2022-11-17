"use strict";
const base_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let initialPokemonName = "charizard";
function createPokemonCard(pokemon_information) {
    const pokemon_card = `
		<section id="pokemon-info-card" class="no_animation">
			<div id="pokemon-sprite">
				<img id="poke-img" src="${pokemon_information}" alt="poke-img">
			</div>
			<input id="pokedex-search" placeholder="Pokemon Name..." type="text">
			</div>
			<div id="pokemon-info">${pokemon_information}</div>
		</section>`;
    document.body.innerHTML += pokemon_card;
    const poke_card = document.getElementById("pokemon-info-card") || undefined;
    if (poke_card == undefined)
        return { "cardState": false };
    poke_card.style.opacity = "0";
    poke_card.style.zIndex = "-1";
    return { "DOMElement": poke_card, "cardState": true };
}
function displayPokemonCard() {
    const pokeball_btn = document.getElementById("pokeball-btn-center") || undefined;
    const pokeball = document.getElementById("pokeball-body") || undefined;
    pokeball_btn.addEventListener("click", () => {
        pokeball_btn.className = "button_flash";
        pokeball.className = "move_pokeball";
        setTimeout(() => {
            getAllPokemon(base_URL);
            const card_exist = createPokemonCard({});
            if (card_exist && card_exist["cardState"]) {
                let card = card_exist["DOMElement"];
                card.className = "show_info";
            }
            else {
                return;
            }
        }, 3000);
    });
}
function getAllPokemon(api_url) {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
        data["results"].find((pokemon) => {
            if (pokemon["name"] === initialPokemonName)
                yourPokemon(pokemon);
        });
    });
}
function yourPokemon(pokemon) {
    const pokemon_url = pokemon["url"];
    const pokemon_information = {
        id: 0,
        order: 0,
        name: "Ashton Martin",
        sprites_src: "frontend/images/pokeball-favicon.png",
        abilities: [],
        stats: [],
        types: [],
        moves: []
    };
    fetch(pokemon_url)
        .then((response) => response.json())
        .then((pokemon_data) => {
        if (pokemon_data)
            return pokemon_information;
        pokemon_information["name"] = pokemon["name"];
        pokemon_information["id"] = pokemon_data["id"];
        pokemon_information["order"] = pokemon_data["order"];
        pokemon_information["sprites_src"] = pokemon_data["sprites"]["front_default"];
        pokemon_information["abilities"] = pokemon_data["abilities"];
        pokemon_information["stats"] = pokemon_data["stats"];
        pokemon_information["types"] = pokemon_data["types"];
        pokemon_information["moves"] = pokemon_data["moves"];
    });
    return pokemon_information;
}
displayPokemonCard();

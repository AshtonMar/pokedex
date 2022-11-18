"use strict";
const base_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let initialPokemonName = window.localStorage.getItem("pokemonName");
let pokemon_information;
function createPokemonCard(pokemon_information) {
    if (!pokemon_information)
        return { "cardState": false };
    const pokemon_card = `
		<section id="pokemon-info-card" class="no_animation">
			<div id="pokemon-sprite">
				<img id="poke-img" src="${pokemon_information["sprites_src"]}" alt="poke-img">
			</div>
			<input id="pokedex-search" placeholder="Pokemon Name..." type="text">
			</div>
			<div id="pokemon-info">
				<h1 id="pokemon-name" class="pokemon-information-item">${pokemon_information["name"]}</h1>
				<h3>Types</h3>
				<div id="pokemon-types" class="container row">
				</div>
				<h3>Stats</h3>
				<div id="pokemon-stats" class="container column">
				</div>
				<h3>Moves</h3>
				<div id="pokemon-moves" class="container column">
				</div>
			</div>
		</section>`;
    document.body.innerHTML += pokemon_card;
    const move_container = document.getElementById("pokemon-moves");
    const stat_container = document.getElementById("pokemon-stats");
    const type_container = document.getElementById("pokemon-types");
    if (move_container && stat_container && type_container) {
        for (const move of pokemon_information["moves"]) {
            const move_name = move["move"]["name"];
            const moves_list = `<a href="${move_name}" class="pokemon-information-item">${move_name}</a> /  `;
            move_container.innerHTML += moves_list;
        }
        for (const stat of pokemon_information["stats"]) {
            const stat_name = stat["stat"]["name"];
            const base_stat = stat["base_stat"];
            const stat_list = `
				<div id="pokemon-stat">
					<label for="pokemon-stat">${stat_name}</label>
					-
					<p class="pokemon-information-item">${base_stat}</p>
				</div>
			`;
            stat_container.innerHTML += stat_list;
        }
        for (const type of pokemon_information["types"]) {
            const type_name = type["type"]["name"];
            const type_list = `<p class="pokemon-information-item">${type_name}</p>`;
            type_container.innerHTML += type_list;
        }
    }
    const poke_card = document.getElementById("pokemon-info-card") || undefined;
    if (poke_card.style.opacity === "0" || !poke_card)
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
        }, 3000);
    });
}
function getAllPokemon(api_url) {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
        data["results"].find((pokemon) => {
            if (pokemon["name"] === initialPokemonName) {
                yourPokemon(pokemon);
            }
        });
    });
}
function yourPokemon(pokemon) {
    if (!pokemon)
        return;
    const pokemon_url = pokemon["url"];
    const pokemon_information_obj = {
        id: 0,
        order: 0,
        name: "Ashton Martin",
        sprites_src: "frontend/images/pokeball-favicon.png",
        stats: [],
        types: [],
        moves: []
    };
    fetch(pokemon_url)
        .then((response) => response.json())
        .then((pokemon_data) => {
        if (!pokemon_data) {
            pokemon_information = pokemon_information_obj;
        }
        else {
            pokemon_information_obj["name"] = pokemon["name"];
            pokemon_information_obj["id"] = pokemon_data["id"];
            pokemon_information_obj["order"] = pokemon_data["order"];
            pokemon_information_obj["sprites_src"] = pokemon_data["sprites"]["front_default"];
            pokemon_information_obj["stats"] = pokemon_data["stats"];
            pokemon_information_obj["types"] = pokemon_data["types"];
            pokemon_information_obj["moves"] = pokemon_data["moves"];
            pokemon_information = pokemon_information_obj;
        }
    })
        .then(() => {
        if (pokemon_information != undefined) {
            const card_exist = createPokemonCard(pokemon_information);
            if (card_exist && card_exist["cardState"]) {
                let card = card_exist["DOMElement"];
                card.className = "show_info";
                pokemonSearch(card_exist);
            }
            else {
                return;
            }
        }
    });
}
function pokemonSearch(exists) {
    const pokemon_search = document.getElementById("pokedex-search");
    if (pokemon_search && exists["cardState"]) {
        pokemon_search.addEventListener("input", () => {
            initialPokemonName = pokemon_search.value;
            window.addEventListener("keypress", (key) => {
                if (key["key"] === "Enter") {
                    const poke_card = document.getElementById("pokemon-info-card") || undefined;
                    poke_card.style.opacity = "0";
                    poke_card.style.zIndex = "-1";
                    if (window.localStorage.getItem("pokemonName") === "")
                        initialPokemonName = "charizard";
                    window.localStorage.setItem("pokemonName", pokemon_search.value);
                    window.location.reload();
                    return;
                }
            });
        });
    }
}
displayPokemonCard();

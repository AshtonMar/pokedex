"use strict";
// Animation activation to be worked on later.
const animations = [
    {
        animation_name: "no_animation",
        // animation_activate: false
    },
    {
        animation_name: "button_flash",
        // animation_activate: false
    },
    {
        animation_name: "open_pokeball",
        // animation_activate: false
    }
];
let currentIndex = 0;
const base_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
function pokeballAnimationControls() {
    let current_animation = animations[0];
    const pokeball_btn = document.getElementById("btn") || undefined;
    pokeball_btn.className = animations[current_animation];
    pokeball_btn.addEventListener("click", () => {
        pokeball_btn.className = "button_flash";
        setTimeout(() => {
            pokeball_btn.className = "no_animation";
            getAllPokemon(base_URL);
        }, 2000);
    });
}
function getAllPokemon(api_url) {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
        console.log(currentIndex);
        const pokemon_info = chooseYourPokemon(data["results"]);
        if (!pokemon_info)
            return;
        fetch(pokemon_info["url"])
            .then((response) => response.json())
            .then((data) => {
            displayPokeInfo(data);
        });
    });
}
function chooseYourPokemon(pokemons) {
    console.log(pokemons[currentIndex]);
    return pokemons[currentIndex];
}
function displayPokeInfo(pokemon_infomation) {
    if (!pokemon_infomation)
        return;
    const pokemon_card = `
		<section id="pokemon-card" class="show_info">
			<div id="pokemon-image">
				<div id="next-btn" class="no_animation">
					<!-- Pokeball Btn -->
					<div id="pokeball-btn-small">
						<div id="btn-small" class="no_animation">
				
						</div>
					</div>
					<!-- END -->
					<!-- Pokeball Structure -->
					<section id="pokeball-top-small" class="pokeball-part-small">
					</section>
					<section id="pokeball-mid-small" class="pokeball-part-small">
					</section>
					<section id="pokeball-bottom-small" class="pokeball-part-small">
					</section>
					<!-- END -->
				</div>
				<img id="poke-img" src="${pokemon_infomation["sprites"]["front_shiny"]}" alt="poke-img">
			</div>
			<div id="pokemon-info">
				<div class="group one">
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
				</div>
				<div class="group two">
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
					<p>Name: ${pokemon_infomation["name"]}</p>
				</div>
			</div>
		</section>`;
    document.body.innerHTML += pokemon_card;
    const poke_card = document.getElementById("pokemon-card");
    if (!poke_card)
        return;
    poke_card.style.animation = "show_info 2s forwards";
    const next_pokemon_btn = document.getElementById("next-btn") || undefined;
    next_pokemon_btn.addEventListener("click", () => {
        currentIndex = currentIndex + 1;
        next_pokemon_btn.className = "rotate_load";
        setTimeout(() => {
            next_pokemon_btn.className = "no_animation";
            getAllPokemon(base_URL);
        }, 2000);
    });
}
pokeballAnimationControls();

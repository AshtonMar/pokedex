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
}
function getAllPokemon(api_url) {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
        const pokemon_info = chooseYourPokemon(data["results"]);
        if (!pokemon_info)
            return;
        fetch(pokemon_info["url"])
            .then((response) => response.json())
            .then((data) => {
            displayPokeInfo(pokemon_info["name"], data);
        });
    });
}
function chooseYourPokemon(pokemons) {
    if (currentIndex === 0)
        return pokemons[currentIndex];
    window.addEventListener("keyup", (key) => {
        if (currentIndex > 0) {
            if (key["code"] === "ArrowRight")
                currentIndex = currentIndex + 1;
            if (key["code"] === "ArrowLeft")
                currentIndex = currentIndex - 1;
            return pokemons[currentIndex];
        }
    });
}
function displayPokeInfo(pokemon_name, pokemon_infomation) {
    console.log(pokemon_name, pokemon_infomation);
}
getAllPokemon(base_URL);

"use strict";
let i = 0;
let currentIndex = 0;
const pokemon_heading = document.getElementById("pokemon-heading");
const base_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const txt = "Gotta Catch'em All";
const speed = 150;
function typeWriter() {
    if (i < txt.length) {
        pokemon_heading.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
// Function to fetch a list of pokemon
function getAllPokemon(url) {
    fetch(url)
        // Convert data from JSON
        .then((response) => response.json())
        //Stuff to do with data
        .then((data) => {
        chooseYourPokemon(data["results"]);
    });
}
function chooseYourPokemon(pokemons) {
    window.addEventListener("keyup", (key) => {
        if (currentIndex === 0)
            displayPokeInfo(pokemons[currentIndex]);
        if (currentIndex > 0) {
            if (key["code"] === "ArrowRight") {
                currentIndex = currentIndex + 1;
            }
            if (key["code"] === "ArrowLeft") {
                currentIndex = currentIndex - 1;
            }
            displayPokeInfo(pokemons[currentIndex]);
        }
    });
}
// Function a pokemon's information
function getPokemon(pokemon_url) {
    let poke_info = [];
    fetch(pokemon_url)
        .then((response) => response.json())
        .then((data) => {
        poke_info = data;
    });
    return poke_info;
}
function displayPokeInfo(pokemon_infomation) {
    const pokemon_image = document.getElementById("pokemon-image");
    const pokemon_info = document.getElementById("pokemon-id");
    console.log(getPokemon(pokemon_infomation["url"]));
}
// Get pokemon values.
getAllPokemon(base_URL);
typeWriter();

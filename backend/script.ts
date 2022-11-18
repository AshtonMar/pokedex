const base_URL: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let initialPokemonName: string = "charizard";
let pokemon_information: { [x: string]: string } | undefined;

function createPokemonCard(pokemon_information: { [x: string]: string }): object {
	console.log(pokemon_information);

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
				${pokemon_information["sprites_src"]}
			</div>
		</section>`

	document.body.innerHTML += pokemon_card;

	const poke_card = document.getElementById("pokemon-info-card") as HTMLElement || undefined;

	if (poke_card == undefined)
		return { "cardState": false };

	poke_card.style.opacity = "0";
	poke_card.style.zIndex = "-1";

	return { "DOMElement": poke_card, "cardState": true };
}

function displayPokemonCard(): void {
	const pokeball_btn = document.getElementById("pokeball-btn-center") as HTMLElement || undefined;
	const pokeball = document.getElementById("pokeball-body") as HTMLElement || undefined;

	pokeball_btn.addEventListener("click", () => {
		pokeball_btn.className = "button_flash";
		pokeball.className = "move_pokeball";

		setTimeout(() => {
			getAllPokemon(base_URL);
		}, 3000);

	})
}

function getAllPokemon(api_url: string): void {
	fetch(api_url)
		.then((response) => response.json())
		.then((data) => {
			data["results"].find((pokemon: { [x: string]: string; }) => {
				if (pokemon["name"] === initialPokemonName) {
					;
					yourPokemon(pokemon);
				}
			})
		});
}

function yourPokemon(pokemon: { [x: string]: string; }): void {
	const pokemon_url = pokemon["url"];

	const pokemon_information_obj: any = {
		id: 0,
		order: 0,
		name: "Ashton Martin",
		sprites_src: "frontend/images/pokeball-favicon.png",
		abilities: [],
		stats: [],
		types: [],
		moves: []
	}

	fetch(pokemon_url)
		.then((response) => response.json())
		.then((pokemon_data) => {
			if (!pokemon_data) {
				pokemon_information = pokemon_information_obj;
			} else {
				console.log("Pusing to");

				pokemon_information_obj["name"] = pokemon["name"];
				pokemon_information_obj["id"] = pokemon_data["id"];
				pokemon_information_obj["order"] = pokemon_data["order"];
				pokemon_information_obj["sprites_src"] = pokemon_data["sprites"]["front_default"];
				pokemon_information_obj["abilities"] = pokemon_data["abilities"];
				pokemon_information_obj["stats"] = pokemon_data["stats"];
				pokemon_information_obj["types"] = pokemon_data["types"];
				pokemon_information_obj["moves"] = pokemon_data["moves"];

				pokemon_information = pokemon_information_obj;
			}
		})
		.then(() => {
			if (pokemon_information != undefined) {
				const card_exist: any = createPokemonCard(pokemon_information);

				if (card_exist && card_exist["cardState"]) {
					let card = card_exist["DOMElement"] as HTMLElement;
					card.className = "show_info"

				} else {
					return;
				}
			}
		});
}

displayPokemonCard();

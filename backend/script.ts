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
				<h1 id="pokemon-name" class="pokemon-information-item">${pokemon_information["name"]}</h1>
				<div id="pokemon-types">
				</div>
				<div id="pokemon-stats">
				</div>
				<div id="pokemon-moves">
				</div>
			</div>
		</section>`

	document.body.innerHTML += pokemon_card;
	const move_container = document.getElementById("pokemon-moves") as HTMLElement | undefined;
	const stat_container = document.getElementById("pokemon-stats") as HTMLElement | undefined;
	const type_container = document.getElementById("pokemon-types") as HTMLElement | undefined;

	if (move_container && stat_container && type_container) {
		for (const move of pokemon_information["moves"]) {
			const move_name: string = move["move"]["name"];

			const moves_list = `<li class="pokemon-information-item">${move_name}</li>`;

			move_container.innerHTML += moves_list;
		}

		for (const stat of pokemon_information["stats"]) {
			const stat_name: string = stat["stat"]["name"];
			const base_stat: string = stat["base_stat"];

			const stat_list = `
				<div id="pokemon-stat">
					<label for="pokemon-stat">${stat_name}</label>
					<li class="pokemon-information-item">${base_stat}</li>
				</div>
			`;

			stat_container.innerHTML += stat_list;
		}

		for (const type of pokemon_information["types"]) {
			const type_name: string = type["type"]["name"];

			const type_list = `<li class="pokemon-information-item">${type_name}</li>`;

			type_container.innerHTML += type_list;
		}
	}

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

let currentIndex: number = 0;
let evolveIndex: number = 0;
const base_URL: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

function pokeballAnimationControls() {
	const pokeball_btn = document.getElementById("btn") as HTMLElement || undefined;
	const pokeball = document.getElementById("pokeball-body") as HTMLElement || undefined;

	pokeball_btn.addEventListener("click", () => {
		pokeball_btn.className = "button_flash";
		pokeball.className = "move_pokeball";

		setTimeout(() => {
			pokeball_btn.className = "no_animation";
			pokeball.className = "no_animation";
			getAllPokemon(base_URL);
		}, 2000);
	})
}

function getAllPokemon(api_url: string) {
	fetch(api_url)
		.then((response) => response.json())
		.then((data) => {
			const pokemon_info: any = chooseYourPokemon(data["results"]);
			if (!pokemon_info)
				return;

			fetch(pokemon_info["url"])
				.then((response) => response.json())
				.then((data) => {
					displayPokeInfo(data);
				});
		});
}

function chooseYourPokemon(pokemons: string[]): string | undefined {
	return pokemons[currentIndex];
}

function displayPokeInfo(pokemon_infomation: any) {
	if (!pokemon_infomation)
		return;

	const pokemon_card = `
		<section id="pokemon-card" class="no_animation">
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
				<img id="poke-img" src="${pokemon_infomation["sprites"]["front_default"]}" alt="poke-img">
				<input id="find-pokemon" placeholder="Find Pokemon..." type="text">
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
		</section>`

	document.body.innerHTML = pokemon_card

	const poke_card = document.getElementById("pokemon-card");
	if (!poke_card)
		return;

	poke_card.style.animation = "show_info 2s forwards";

	const next_pokemon_btn = document.getElementById("next-btn") as HTMLButtonElement || undefined;
	next_pokemon_btn.addEventListener("click", () => {
		currentIndex = currentIndex + 3
		next_pokemon_btn.className = "rotate_load";
		setTimeout(() => {
			next_pokemon_btn.className = "no_animation";
			getAllPokemon(base_URL);
		}, 2000);
	})
}

pokeballAnimationControls();

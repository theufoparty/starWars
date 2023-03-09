let player1 = null;
let player2 = null;

const goodCharactersContainer = document.querySelector(".good-characters");
const goodCharacters = {};

const goodCharacterIDs = ["1", "2", "3"];

const evilCharactersContainer = document.querySelector(".evil-characters");
const evilCharacters = {};

const evilCharacterIDs = ["4", "10", "13"];

const player1Container = document.querySelector(".player1-container");
const player2Container = document.querySelector(".player2-container");

const setPlayer = (character) => {
	const isGood = goodCharacterIDs.includes(character.id);
	const playerContainer = isGood ? player1Container : player2Container;
	let characterPortrait = playerContainer.querySelector(".player-img");
	let characterName = playerContainer.querySelector(".player-name");
	characterPortrait.src = `/full-body/${character.id}.png`;
	characterPortrait.dataset.id = character.id;
	characterName.innerText = character.name;
	characterPortrait.dataset.name = character.name;
};

const appendCharacterPortrait = (character) => {
	const isGood = goodCharacterIDs.includes(character.id);
	const characterPortrait = document.createElement("img");
	characterPortrait.classList.add("characterPortrait");
	characterPortrait.src = `/portraits/${character.id}.png`;
	characterPortrait.id = character.id;
	characterPortrait.addEventListener("click", () => {
		if (isGood) {
			if (player1) {
				const previousPortrait = document.getElementById(player1.id);
				previousPortrait.classList.remove("darken");
			}
			player1 = character;
		} else {
			if (player2) {
				const previousPortrait = document.getElementById(player2.id);
				previousPortrait.classList.remove("darken");
			}
			player2 = character;
		}
		characterPortrait.classList.add("darken");
		setPlayer(character);
	});
	if (isGood) {
		goodCharactersContainer.append(characterPortrait);
	} else {
		evilCharactersContainer.append(characterPortrait);
	}
};

const createCharacterInfo = (character) => {
	const characterInfo = document.createElement("div");
	characterInfo.classList.add("character-info");

	const characterName = document.createElement("p");
	characterName.classList.add("character-text");
	characterName.innerText = `Name: ${character.name}`;
	characterName.dataset.name = character.name;
	characterInfo.append(characterName);

	const characterHeight = document.createElement("p");
	characterHeight.classList.add("character-text");
	characterHeight.innerText = `Height: ${character.height} cm`;
	characterHeight.dataset.height = character.height;
	characterInfo.append(characterHeight);

	const characterMass = document.createElement("p");
	characterMass.classList.add("character-text");
	characterMass.innerText = `Weight: ${character.mass} kg`;
	characterMass.dataset.mass = character.mass;
	characterInfo.append(characterMass);

	const characterSkinColor = document.createElement("p");
	characterSkinColor.classList.add("character-text");
	characterSkinColor.innerText = `Skin Color: ${character.skinColor}`;
	characterSkinColor.dataset.skin_color = character.skinColor;
	characterInfo.append(characterSkinColor);

	const characterEyeCOlor = document.createElement("p");
	characterEyeCOlor.classList.add("character-text");
	characterEyeCOlor.innerText = `Eye Color: ${character.eyeColor}`;
	characterEyeCOlor.dataset.eyeColor = character.eyeColor;
	characterInfo.append(characterEyeCOlor);

	const AmountOfMovies = document.createElement("p");
	AmountOfMovies.classList.add("character-text");
	AmountOfMovies.innerText = `Movies: ${character.movies.map((movie) => movie.title).join(", ")}`;
	AmountOfMovies.dataset.movies = character.movies;
	characterInfo.append(AmountOfMovies);

	document.body.append(characterInfo);
};

player1Container.addEventListener("click", () => {
	createCharacterInfo(player1);
});

player2Container.addEventListener("click", () => {
	createCharacterInfo(player2);
});

const fetchCharacterData = (id) =>
	fetch(`https://swapi.dev/api/people/${id}/`).then((res) => res.json());

[...evilCharacterIDs, ...goodCharacterIDs].forEach(async (id) => {
	const characterData = await fetchCharacterData(id);
	const character = new Character(characterData);
	// evilCharacters[character.id] = character;
	appendCharacterPortrait(character);
});

const fightButton = document.querySelector(".fight-button");

const showResults = (player1, player2) => {
	const tallestResult = document.querySelector(".tallestResult");
	if (player1.height > player2.height) {
		tallestResult.innerText = `${player1.name} (${player1.height}) is taller than ${player2.name} (${player2.height})`;
	} else if (player1Container.height === player2.height) {
		heviestResult.innerText = `${player2.name} (${player2.height}) is equal to ${player1.name} (${player1.height})`;
	} else {
		tallestResult.innerText = `${player2.name} (${player2.height}) is taller than ${player1.name} (${player1.height})`;
	}

	const heviestResult = document.querySelector(".heaviestResult");
	if (player1.mass > player2.mass) {
		heviestResult.innerText = `${player1.name} (${player1.mass}) is heavier than ${player2.name} (${player2.mass})`;
	} else if (player1Container.mass === player2.mass) {
		heviestResult.innerText = `${player2.name} (${player2.mass}) is equal to ${player1.name} (${player1.mass})`;
	} else {
		heviestResult.innerText = `${player2.name} (${player2.mass}) is heavier than ${player1.name} (${player1.mass})`;
	}

	const genderResult = document.querySelector(".genderResult");
	if (player1.gender === player2.gender) {
		genderResult.innerText = `${player1.name} (${player1.gender}) is the same gender as ${player2.name} (${player2.gender})`;
	} else {
		genderResult.innerText = `${player2.name} (${player2.gender}) is not the same gender as ${player1.name} (${player1.gender})`;
	}

	const skinColorResult = document.querySelector(".skinColorResult");
	if (player1.skinColor === player2.skinColor) {
		skinColorResult.innerText = `${player1.name} (${player1.skinColor}) has the same skin color as ${player2.name} (${player2.skinColor})`;
	} else {
		skinColorResult.innerText = `${player2.name} (${player2.skinColor}) dont have the same skin color as ${player1.name} (${player1.skinColor})`;
	}

	const eyeColorResult = document.querySelector(".eyeColorResult");
	if (player1.eyeColor === player2.eyeColor) {
		eyeColorResult.innerText = `${player1.name} (${player1.eyeColor}) has the same eye color as ${player2.name} (${player2.eyeColor})`;
	} else {
		eyeColorResult.innerText = `${player2.name} (${player2.eyeColor}) dont have the same eye color as ${player1.name} (${player1.eyeColor})`;
	}

	const hairColorResult = document.querySelector(".hairColorResult");
	if (player1.hairColor === player2.hairColor) {
		hairColorResult.innerText = `${player1.name} (${player1.hairColor}) has the same hair color as ${player2.name} (${player2.hairColor})`;
	} else {
		hairColorResult.innerText = `${player2.name} (${player2.hairColor}) dont have the same hair color as ${player1.name} (${player1.hairColor})`;
	}
};

fightButton.addEventListener("click", () => {
	showResults(player1, player2);
});

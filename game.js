class Game {
	player1 = null;
	player2 = null;
	goodCharacters = [];
	evilCharacters = [];
	setPlayer = (character) => {
		if (character.isGood) {
			this.player1 = character;
		} else {
			this.player2 = character;
		}
	};
	addCharacter = (character) => {
		if (character.isGood) {
			this.goodCharacters.push(character);
		} else {
			this.evilCharacters.push(character);
		}
	};
	getPlayer1 = () => this.player1;
	getPlayer2 = () => this.player2;

	coStarring = () => {
		const coStarring = this.player1.movies.filter((player1movie) =>
			this.player2.movies.some((player2movie) => player1movie.title === player2movie.title)
		);
		return coStarring.map((movie) => movie.title);
	};

	compareHomePlanets = () => {
		return this.player1.homePlanet.name === this.player2.homePlanet.name;
	};

	fight = () => {
		const result = {};
		const { player1, player2 } = this;

		if (player1.height > player2.height) {
			result.tallest = `${player1.name} (${player1.height}) is taller than ${player2.name} (${player2.height})`;
		} else if (player1.height === player2.height) {
			result.tallest = `${player2.name} (${player2.height}) is equal to ${player1.name} (${player1.height})`;
		} else {
			result.tallest = `${player2.name} (${player2.height}) is taller than ${player1.name} (${player1.height})`;
		}

		if (player1.mass > player2.mass) {
			result.heaviest = `${player1.name} (${player1.mass}) is heavier than ${player2.name} (${player2.mass})`;
		} else if (player1.mass === player2.mass) {
			result.heaviest = `${player2.name} (${player2.mass}) is equal to ${player1.name} (${player1.mass})`;
		} else {
			result.heaviest = `${player2.name} (${player2.mass}) is heavier than ${player1.name} (${player1.mass})`;
		}

		if (player1.gender === player2.gender) {
			result.gender = `${player1.name} (${player1.gender}) is the same gender as ${player2.name} (${player2.gender})`;
		} else {
			result.gender = `${player2.name} (${player2.gender}) is not the same gender as ${player1.name} (${player1.gender})`;
		}

		if (player1.skinColor === player2.skinColor) {
			result.skinColor = `${player1.name} (${player1.skinColor}) has the same skin color as ${player2.name} (${player2.skinColor})`;
		} else {
			result.skinColor = `${player2.name} (${player2.skinColor}) dont have the same skin color as ${player1.name} (${player1.skinColor})`;
		}

		if (player1.eyeColor === player2.eyeColor) {
			result.eyeColor = `${player1.name} (${player1.eyeColor}) has the same eye color as ${player2.name} (${player2.eyeColor})`;
		} else {
			result.eyeColor = `${player2.name} (${player2.eyeColor}) dont have the same eye color as ${player1.name} (${player1.eyeColor})`;
		}

		if (player1.hairColor === player2.hairColor) {
			result.hairColor = `${player1.name} (${player1.hairColor}) has the same hair color as ${player2.name} (${player2.hairColor})`;
		} else {
			result.hairColor = `${player2.name} (${player2.hairColor}) dont have the same hair color as ${player1.name} (${player1.hairColor})`;
		}

		return result;
	};
}

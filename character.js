const parseVehiclePrice = (priceString) => {
	if (priceString === "unknown") {
		return 0;
	}
	return Number(priceString);
};

class Character {
	constructor(characterData, isGood) {
		this.isGood = isGood;
		const {
			url,
			name,
			height,
			mass,
			hair_color,
			skin_color,
			eye_color,
			gender,
			films,
			homeworld,
			vehicles,
			starships,
		} = characterData;
		this.id = url.slice(29).slice(0, -1);
		this.name = name;
		this.height = Number(height);
		this.mass = Number(mass);
		this.hairColor = hair_color;
		this.skinColor = skin_color;
		this.eyeColor = eye_color;
		this.gender = gender;
		this.homePlanet = fetch(homeworld)
			.then((res) => res.json())
			.then((data) => {
				this.homePlanet = data;
			});
		this.vehicles = [];
		vehicles.forEach((vehiclesUrl) => {
			console.log(this.vehicles);
			fetch(vehiclesUrl)
				.then((res) => res.json())
				.then((vehiclesData) => {
					this.vehicles.push(vehiclesData);
				});
		});
		this.starships = [];
		starships.forEach((starshipsUrl) => {
			fetch(starshipsUrl)
				.then((res) => res.json())
				.then((starshipsData) => {
					this.starships.push(starshipsData);
				});
		});
		this.movies = [];
		films.forEach((filmUrl) => {
			fetch(filmUrl)
				.then((res) => res.json())
				.then((movieData) => {
					this.movies.push(movieData);
				});
		});
	}

	firstApperance = () => {
		const sortedMovies = this.movies.sort((a, b) => {
			return new Date(a.release_date) - new Date(b.release_date);
		});
		return sortedMovies[0].release_date;

		console.log(sortedMovies.map((m) => m.release_date));
	};

	mostExpensiveVehicle = () => {
		const mostExpensive = this.vehicles.sort((a, b) => {
			return parseVehiclePrice(b.cost_in_credits) - parseVehiclePrice(a.cost_in_credits);
		});
		if (!mostExpensive[0]) {
			return 0;
		}
		return mostExpensive[0].cost_in_credits;

		console.log(mostExpensive.map((m) => m.cost_in_credits));
	};

	mostExpensiveStarship = () => {
		const mostExpensive = this.starships.sort((a, b) => {
			return parseVehiclePrice(b.cost_in_credits) - parseVehiclePrice(a.cost_in_credits);
		});
		if (!mostExpensive[0]) {
			return 0;
		}
		return mostExpensive[0].cost_in_credits;

		console.log(mostExpensive.map((m) => m.cost_in_credits));
	};

	// compareMostExpensiveSpaceRocket = () => {
	// 	if (character.mostExpensiveStarship > character.mostExpensiveVehicle) {
	// 		return `The most expensive one: ${character.mostExpensiveStarship.name}`;
	// 	} else {
	// 		return `The most expensive one: ${character.mostExpensiveVehicle.name}`;
	// 	}
	// };

	printCharacter = () => {
		console.log(`Name; ${this.name}`);
		console.log(`Heigth: ${this.height}`);
		console.log(`Mass: ${this.mass}`);
		console.log(`Hair Color:${this.hairColor}`);
		console.log(`Skin Color: ${this.skinColor}`);
		console.log(`Eye Color: ${this.eyeColor}`);
		console.log(`Gender: ${this.gender}`);
		console.log(`Movies: ${this.movies.map((movie) => movie.title).join(", ")}`);
	};
}

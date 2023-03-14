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
		this.fullbodyUrl = `/full-body/${this.id}.png`;
		this.portraitUrl = `/portraits/${this.id}.png`;
		this.name = name;
		this.height = Number(height);
		this.mass = Number(mass);
		this.hairColor = hair_color;
		this.skinColor = skin_color;
		this.eyeColor = eye_color;
		this.gender = gender;
		fetchData(homeworld).then((homePlanet) => {
			this.homePlanet = homePlanet;
		});
		this.vehicles = [];
		vehicles.forEach((vehiclesUrl) => {
			fetchData(vehiclesUrl).then((vehiclesData) => {
				this.vehicles.push(vehiclesData);
			});
		});
		this.starships = [];
		starships.forEach((starshipsUrl) => {
			fetchData(starshipsUrl).then((starshipsData) => {
				this.starships.push(starshipsData);
			});
		});
		this.movies = [];
		films.forEach((filmUrl) => {
			fetchData(filmUrl).then((movieData) => {
				this.movies.push(movieData);
			});
		});
	}

	parsePrice = (priceString) => {
		if (!priceString) {
			return -1;
		}
		if (priceString === "unknown") {
			return 0;
		}
		return Number(priceString);
	};

	firstApperance = () => {
		const sortedMovies = this.movies.sort((a, b) => {
			return new Date(a.release_date) - new Date(b.release_date);
		});
		return sortedMovies[0];
	};

	mostExpensiveVehicle = () => {
		console.log(this.vehicles);
		const mostExpensive = this.vehicles.sort((a, b) => {
			return this.parsePrice(b.cost_in_credits) - this.parsePrice(a.cost_in_credits);
		});
		return mostExpensive[0];
	};

	mostExpensiveStarship = () => {
		console.log(this.starships);
		const mostExpensive = this.starships.sort((a, b) => {
			return this.parsePrice(b.cost_in_credits) - this.parsePrice(a.cost_in_credits);
		});
		return mostExpensive[0];
	};

	mostExpensiveTransportationDevice = () => {
		const mostExpensiveVehicle = this.mostExpensiveVehicle();
		const mostExpensiveStarship = this.mostExpensiveStarship();

		return this.parsePrice(mostExpensiveVehicle?.cost_in_credits) <
			this.parsePrice(mostExpensiveStarship?.cost_in_credits)
			? mostExpensiveStarship
			: mostExpensiveVehicle;
	};

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

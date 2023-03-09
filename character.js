class Character {
	constructor(characterData) {
		const { url, name, height, mass, hair_color, skin_color, eye_color, gender, films } =
			characterData;
		this.id = url.slice(29).slice(0, -1);
		this.name = name;
		this.height = Number(height);
		this.mass = Number(mass);
		this.hairColor = hair_color;
		console.log(mass);
		this.skinColor = skin_color;
		this.eyeColor = eye_color;
		this.gender = gender;
		this.movies = [];
		films.forEach((filmUrl) => {
			fetch(filmUrl)
				.then((res) => res.json())
				.then((movieData) => {
					this.movies.push(movieData);
				});
		});
	}
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

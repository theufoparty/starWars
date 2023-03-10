class GameScreen {
	game = null;
	informationBox = new InformationBox();
	goodCharactersContainer = document.querySelector(".good-characters");
	evilCharactersContainer = document.querySelector(".evil-characters");
	player1Container = document.querySelector(".player1-container");
	player2Container = document.querySelector(".player2-container");
	fightButton = document.querySelector(".fight-button");

	setGame = (game) => {
		this.game = game;
	};

	setPlayer = (character) => {
		const playerContainer = character.isGood ? this.player1Container : this.player2Container;
		let characterPortrait = playerContainer.querySelector(".player-img");
		let characterName = playerContainer.querySelector(".player-name");
		characterPortrait.src = `/full-body/${character.id}.png`;
		characterName.innerText = character.name;
	};

	addCharacterPortrait = (character) => {
		const characterPortrait = document.createElement("img");
		characterPortrait.classList.add("characterPortrait");
		characterPortrait.src = `/portraits/${character.id}.png`;
		characterPortrait.id = character.id;
		characterPortrait.addEventListener("click", () => {
			if (character.isGood) {
				const player1 = this.game.getPlayer1();
				if (player1) {
					const previousPortrait = document.getElementById(player1.id);
					previousPortrait.classList.remove("darken");
				}
			} else {
				const player2 = this.game.getPlayer2();
				if (player2) {
					const previousPortrait = document.getElementById(player2.id);
					previousPortrait.classList.remove("darken");
				}
			}
			characterPortrait.classList.add("darken");
			this.game.setPlayer(character);
			this.setPlayer(character);
		});
		if (character.isGood) {
			this.goodCharactersContainer.append(characterPortrait);
		} else {
			this.evilCharactersContainer.append(characterPortrait);
		}
	};

	showCharacterInformation = (character) => {
		this.informationBox.clearButtonContainer();

		const showInformationCallBack = () => {
			const informationList = [
				`Name: ${character.name}`,
				`Height: ${character.height} cm`,
				`Weight: ${character.mass} kg`,
				`Skin Color: ${character.skinColor}`,
				`Eye Color: ${character.eyeColor}`,
				`Movies: ${character.movies.map((movie) => movie.title).join(", ")}`,
				`Home Planet: ${character.homePlanet.name}`,
				`Vehicles: ${character.vehicles.map((vehicle) => vehicle.name).join(", ")}`,
				`Starships: ${character.starships.map((starship) => starship.name).join(", ")}`,
			];
			this.informationBox.addInformation(informationList);
		};

		const showFirstApperanceCallBack = () => {
			const firstApperance = character.firstApperance();
			const informationList = [`${character.name} first appeared in a movie ${firstApperance}`];
			this.informationBox.addInformation(informationList);
		};

		const showMostExpensiveVehicle = () => {
			const mostExpensiveVehicle = character.mostExpensiveVehicle();
			const informationList = [
				`${character.name}´s most expensive vehicle costs ${mostExpensiveVehicle} amount of credits`,
			];
			this.informationBox.addInformation(informationList);
		};

		const showMostExpensiveStarship = () => {
			const mostExpensiveStarship = character.mostExpensiveStarship();
			const informationList = [
				`${character.name}´s most expensive starship costs ${mostExpensiveStarship} amount of credits`,
			];
			this.informationBox.addInformation(informationList);
		};

		this.informationBox.addButton("Most Expensive Starship", showMostExpensiveStarship);
		this.informationBox.addButton("Character Information", showInformationCallBack);
		this.informationBox.addButton("Most Expensive Vehicle", showMostExpensiveVehicle);
		this.informationBox.addButton("first movie", showFirstApperanceCallBack);
		showInformationCallBack();
		this.informationBox.showBox();
	};

	showFightResult = (result) => {
		this.informationBox.clearButtonContainer();
		const showBoxFightResultCallBack = () => {
			const informationList = Object.values(result);
			this.informationBox.addInformation(informationList);
		};

		const showCoStarringCallBack = () => {
			const coStarring = this.game.coStarring();
			const player1 = this.game.getPlayer1();
			const player2 = this.game.getPlayer2();
			const informationList = [
				`${player1.name} and ${player2.name} both appeared in the following movies:`,
				...coStarring,
			];
			this.informationBox.addInformation(informationList);
		};

		const compareHomePlanetsCallBack = () => {
			const samePlanet = this.game.compareHomePlanets();
			const player1 = this.game.getPlayer1();
			const player2 = this.game.getPlayer2();
			const informationList = samePlanet
				? [`${player1.name} and ${player2.name} are both from ${player1.homePlanet.name}`]
				: [
						`${player1.name} is from ${player1.homePlanet.name}`,
						`${player2.name} is from ${player2.homePlanet.name}`,
				  ];
			this.informationBox.addInformation(informationList);
		};

		this.informationBox.addButton("Fight Result", showBoxFightResultCallBack);
		this.informationBox.addButton("Co-Starring", showCoStarringCallBack);
		this.informationBox.addButton("Compare Planets", compareHomePlanetsCallBack);
		showBoxFightResultCallBack();

		this.informationBox.showBox();
	};

	constructor() {
		this.player1Container.addEventListener("click", () => {
			const character = this.game.getPlayer1();
			this.showCharacterInformation(character);
		});
		this.player2Container.addEventListener("click", () => {
			const character = this.game.getPlayer2();
			this.showCharacterInformation(character);
		});

		this.fightButton.addEventListener("click", () => {
			const result = this.game.fight();
			this.showFightResult(result);
		});
	}
}

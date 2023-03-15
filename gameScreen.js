class GameScreen {
	game = new Game();
	informationBox = new InformationBox();
	goodCharacterContainer = document.querySelector(".good-characters-container");
	evilCharacterContainer = document.querySelector(".evil-characters-container");
	goodCharacterPortraitsContainer = document.querySelector(".good-characters");
	evilCharacterPortraitsContainer = document.querySelector(".evil-characters");
	player1Container = document.querySelector(".player1-container");
	player2Container = document.querySelector(".player2-container");
	fightButton = document.querySelector(".fight-button");

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

	setPlayer = (character) => {
		const playerContainer = character.isGood ? this.player1Container : this.player2Container;
		let characterPortrait = playerContainer.querySelector(".player-img");
		let characterName = playerContainer.querySelector(".player-name");
		playerContainer.classList.remove("un-shifted");
		characterPortrait.classList.remove("hidden");
		setTimeout(
			() => {
				characterPortrait.src = character.fullbodyUrl;
				characterPortrait.onload = () => {
					playerContainer.classList.add("un-shifted");
				};
				characterName.innerText = character.name;
			},
			characterPortrait.src ? 1000 : 0
		);
	};

	addCharacterPortrait = (character) => {
		const characterPortrait = document.createElement("img");
		characterPortrait.classList.add("characterPortrait");
		characterPortrait.src = character.portraitUrl;
		characterPortrait.id = character.id;
		if (character.isGood) {
			this.goodCharacterPortraitsContainer.append(characterPortrait);
		} else {
			this.evilCharacterPortraitsContainer.append(characterPortrait);
		}
		characterPortrait.addEventListener("click", () => {
			if (character.isGood) {
				const player1 = this.game.getPlayer1();
				this.goodCharacterContainer.classList.add("selected-character");
				if (player1) {
					const previousPortrait = document.getElementById(player1.id);
					previousPortrait.classList.remove("darken");
				}
			} else {
				const player2 = this.game.getPlayer2();
				this.evilCharacterContainer.classList.add("selected-character");
				if (player2) {
					const previousPortrait = document.getElementById(player2.id);
					previousPortrait.classList.remove("darken");
				}
			}
			characterPortrait.classList.add("darken");
			this.game.setPlayer(character);
			this.setPlayer(character);
		});
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
				`Vehicles: ${
					!character.vehicles.length
						? "Owns no vehicles."
						: character.vehicles.map((vehicle) => vehicle.name).join(", ")
				}`,
				`Starships: ${
					!character.starships.length
						? "Owns no Starships."
						: character.starships.map((starship) => starship.name).join(", ")
				}`,
			];
			this.informationBox.addInformation(informationList);
		};

		const showFirstApperanceCallBack = () => {
			const firstApperance = character.firstApperance();
			const informationList = [
				`${character.name} first appeared in ${firstApperance.title} and it was released ${firstApperance.release_date}.`,
			];
			this.informationBox.addInformation(informationList);
		};

		const showMostExpensiveTransportationDevice = () => {
			const informationList = [];
			const mostExpensiveTransportationDevice = character.mostExpensiveTransportationDevice();
			if (!mostExpensiveTransportationDevice) {
				informationList.push(
					`${character.name} doesn't have any transportation devices. They only use legs or wheels.`
				);
			} else if (mostExpensiveTransportationDevice.cost_in_credits === "unknown") {
				informationList.push(
					` No one knows how much the ${mostExpensiveTransportationDevice.name} costs. BUT IT IS THE ONLY ONE.`
				);
			} else {
				informationList.push(
					`${character.name}´s most expensive transportation device is the ${
						mostExpensiveTransportationDevice.name
					}, and it costs ${Number(
						mostExpensiveTransportationDevice.cost_in_credits
					).toLocaleString("sv-SE")} credits.`
				);
			}
			this.informationBox.addInformation(informationList);
		};

		this.informationBox.addButton("Character Information", showInformationCallBack);
		this.informationBox.addButton("Most Expensive", showMostExpensiveTransportationDevice);
		this.informationBox.addButton("First movie", showFirstApperanceCallBack);
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
				!coStarring.length
					? `${player1.name} and ${player2.name} do not appear in any movies together.`
					: `${player1.name} and ${player2.name} both appeared in the following movies:`,
				...coStarring,
			];
			this.informationBox.addInformation(informationList);
		};

		const compareHomePlanetsCallBack = () => {
			const samePlanet = this.game.compareHomePlanets();
			const player1 = this.game.getPlayer1();
			const player2 = this.game.getPlayer2();
			const informationList = samePlanet
				? [`${player1.name} and ${player2.name} are both from ${player1.homePlanet.name}.`]
				: [
						`${player1.name} is from ${player1.homePlanet.name}.`,
						`${player2.name} is from ${player2.homePlanet.name}.`,
				  ];
			this.informationBox.addInformation(informationList);
		};

		this.informationBox.addButton("Fight Result", showBoxFightResultCallBack);
		this.informationBox.addButton("Co-Starring", showCoStarringCallBack);
		this.informationBox.addButton("Compare Planets", compareHomePlanetsCallBack);
		showBoxFightResultCallBack();

		this.informationBox.showBox();
	};
}

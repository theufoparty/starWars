const goodCharacterIDs = ["1", "2", "3", "13", "20", "14", "10", "5"];
const evilCharacterIDs = ["4", "23", "21", "22", "44", "79", "67", "12"];

const gameScreen = new GameScreen();

[...evilCharacterIDs, ...goodCharacterIDs].forEach(async (id) => {
	const characterData = await fetchData(`https://swapi.dev/api/people/${id}/`);
	const character = new Character(characterData, goodCharacterIDs.includes(id), id);
	gameScreen.addCharacterPortrait(character);
});

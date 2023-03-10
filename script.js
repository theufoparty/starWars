const goodCharacterIDs = ["1", "2", "3", "13"];
const evilCharacterIDs = ["4", "10"];

const game = new Game();
const gameScreen = new GameScreen();

gameScreen.setGame(game);

const fetchCharacterData = (id) =>
	fetch(`https://swapi.dev/api/people/${id}/`).then((res) => res.json());

[...evilCharacterIDs, ...goodCharacterIDs].forEach(async (id) => {
	const characterData = await fetchCharacterData(id);
	const character = new Character(characterData, goodCharacterIDs.includes(id));
	game.addCharacter(character);
	gameScreen.addCharacterPortrait(character);
});

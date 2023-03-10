class InformationBox {
	backdrop = document.querySelector(".backdrop");
	informationBox = document.querySelector(".information-box");
	buttonContainer = document.querySelector(".button-container");
	textarea = document.querySelector(".textarea");

	showBox = () => {
		this.backdrop.classList.remove("hidden");
		this.informationBox.classList.remove("hidden");
	};

	hideBox = () => {
		this.backdrop.classList.add("hidden");
		this.informationBox.classList.add("hidden");
	};

	clearTextarea = () => {
		this.textarea.innerHTML = "";
	};

	clearButtonContainer = () => {
		this.buttonContainer.innerHTML = "";
	};

	addInformation = (informationList) => {
		this.clearTextarea();
		informationList.forEach((paragraph) => {
			const pElement = document.createElement("p");
			pElement.innerText = paragraph;
			this.textarea.append(pElement);
		});
	};

	addButton = (buttonText, buttonCallBackFunction) => {
		const buttonElement = document.createElement("button");
		buttonElement.innerText = buttonText;
		buttonElement.addEventListener("click", buttonCallBackFunction);
		this.buttonContainer.append(buttonElement);
	};

	constructor() {
		this.backdrop.addEventListener("click", () => {
			this.hideBox();
		});
	}
}

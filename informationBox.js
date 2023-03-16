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

	typeWrite = async (paragraphText) => {
		const paragraphElement = document.createElement("p");
		this.textarea.append(paragraphElement);
		let i = 0;
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				paragraphElement.innerText = paragraphText.slice(0, i);
				i++;
				if (i > paragraphText.length) {
					clearInterval(interval);
					resolve();
				}
			}, 20);
		});
	};

	addInformation = async (informationList) => {
		this.clearTextarea();
		for (let i = 0; i < informationList.length; i++) {
			const paragraphText = informationList[i];
			await this.typeWrite(paragraphText);
		}
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

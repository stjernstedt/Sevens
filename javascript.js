function createCard(color, number) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.number = number;
	card.color = color;
	switch (color) {
		case 1:
			card.textContent = "♥" + number;
			card.style.color = "#ff0000";
			break;
		case 2:
			card.textContent = "♠" + number;
			break;
		case 3:
			card.textContent = "♦" + number;
			card.style.color = "#ff0000";
			break;
		case 4:
			card.textContent = "♣" + number;
			break;
	}

	return card;
}

let deck = [];
let hand = [];
let board = [];

function createDeck() {
	for (let color = 1; color <= 4; color++) {
		for (let i = 1; i <= 14; i++) {
			deck.push(createCard(color, i));
		}
	}
}

function fillHand() {
	for (let i = 0; i < 7; i++) {
		const number = Math.floor(Math.random() * deck.length);
		const card = deck[number];
		deck.splice(number, 1);
		addCardToHand(card);
	}
}

function addCardToHand(card) {
	hand.push(card);
	card.addEventListener("click", playCard);
	document.querySelector("#cardholder").appendChild(card);
}

function addCardToBoard(card) {
	card.style.gridColumn = card.number;
	card.style.gridRow = card.color;
	console.log(card.style.gridColumn);
	board.push(card);
	hand.splice(hand.indexOf(card), 1);
	document.querySelector("#gameboard").appendChild(card);
	card.removeEventListener("click", playCard);
}

function playCard(e) {
	const card = e.target;
	addCardToBoard(card);
}

createDeck();
fillHand();
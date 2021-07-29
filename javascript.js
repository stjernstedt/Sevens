class Deck {
	constructor() {
		this.cards = [];
		this.shuffle = function () {
			// Fisher-Yates shuffle algorithm
			for (let i = this.cards.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
			}
		};

		this.sortCards = function () {
			this.cards.sort(function (a, b) { return a.id - b.id; });
		};

		this.addCard = function (card) {
			this.cards.push(card);
		};

		this.popCard = function () {
			if (this.cards.length == 0)
				return false;
			return this.cards.pop();
		};

		this.getCard = function (card) {
			return this.cards.splice(this.cards.indexOf(card), 1);
		};

		this.fillDeck = function () {
			for (let color = 1; color <= 4; color++) {
				for (let i = 1; i <= 13; i++) {
					this.addCard(createCard(color, i));
				}
			}
		};
	}
}

function createCard(color, number) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.id = number + (color * 13);
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


function fillHand() {
	while (true) {
		const card = deck.popCard();
		if (!card) break;
		addCardToHand(card);
	}
}

function addCardToHand(card) {
	hand.addCard(card);
	card.addEventListener("click", playCard);
	document.querySelector("#cardholder").appendChild(card);
}

function addCardToBoard(card) {
	card.style.gridColumn = card.number;
	card.style.gridRow = card.color;
	console.log(hand.cards.length);
	board.addCard(hand.getCard(card));
	document.querySelector("#gameboard").appendChild(card);
	card.removeEventListener("click", playCard);
}

function playCard(e) {
	const card = e.target;
	addCardToBoard(card);
}

let deck = new Deck();
deck.fillDeck();
deck.shuffle();
let hand = new Deck();
let board = new Deck();

fillHand();
// TODO add some kind of redraw function
// hand.sortCards();
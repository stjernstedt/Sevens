class Deck {
	constructor() {
		this.cards = [];
	}

	shuffle() {
		// Fisher-Yates shuffle algorithm
		for (let i = this.cards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	};

	sortCards() {
		this.cards.sort(function (a, b) { return a.id - b.id; });
	};

	addCard(card) {
		this.cards.push(card);
	};

	popCard() {
		if (this.cards.length == 0)
			return false;
		return this.cards.pop();
	};

	getCard(card) {
		return this.cards.splice(this.cards.indexOf(card), 1);
	};

	fillDeck() {
		for (let color = 1; color <= 4; color++) {
			for (let i = 1; i <= 13; i++) {
				this.addCard(createCard(color, i));
			}
		}
	};

	dealCards(players, cards) {
		const hands = [];
		for (let i = 0; i < players; i++) {
			const hand = new Deck();
			for (let i = 0; i < cards; i++) {
				hand.addCard(deck.popCard());
			}
			hands.push(hand);
		}
		return hands;
	}

	dealAllCards(players) {
		const hands = [];
		for (let i = 0; i < players; i++) {
			const hand = new Deck();
			hands.push(hand);
		}

		let handCount = 0;
		while (true) {
			const card = deck.popCard();
			if (!card) break;
			hands[handCount].addCard(card);
			handCount++;
			if (handCount >= players) handCount = 0;
		}

		return hands;
	}
}

function createCard(color, number) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.classList.add("cardInHand");
	card.addEventListener("click", playCard);
	card.id = number + (color * 13);
	card.number = number;
	card.color = color;
	switch (color) {
		case 1:
			card.textContent = "♥" + number;
			card.style.color = "#ff0000";
			break;
		case 2:
			card.textContent = "♣" + number;
			break;
		case 3:
			card.textContent = "♦" + number;
			card.style.color = "#ff0000";
			break;
		case 4:
			card.textContent = "♠" + number;
			break;
	}

	return card;
}

//fix for multiple hands
function playCard(e) {
	const card = e.target;
	card.classList.remove("cardInHand");
	card.style.gridColumn = card.number;
	card.style.gridRow = card.color;
	board.addCard(hands[0].getCard(card));
	document.querySelector("#gameboard").appendChild(card);
	card.removeEventListener("click", playCard);
}

function redrawHand() {
	const cardHolder = document.querySelector("#cardholder");
	hands[0].sortCards();
	let cards = hands[0].cards;
	for (let i = 0; i < cards.length; i++) {
		if (cardHolder.contains(cards[i])) {
			cardHolder.removeChild(cards[i]);
		}
	}
	for (let i = 0; i < cards.length; i++) {
		cardHolder.appendChild(cards[i]);
	}

}

let deck = new Deck();
deck.fillDeck();
deck.shuffle();
let board = new Deck();
let hands = deck.dealAllCards(3);
redrawHand();
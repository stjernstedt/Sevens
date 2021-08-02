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
		return this.cards.splice(this.cards.indexOf(card), 1)[0];
	};

	fillDeck() {
		for (let suit = 1; suit <= 4; suit++) {
			for (let i = 1; i <= 13; i++) {
				this.addCard(new Card(suit, i));
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

class Card {
	constructor(suit, number) {
		this.suit = suit;
		this.number = number;
		this.id = number + (suit * 13);
		this.divElement = document.createElement("div");
		this.divElement.classList.add("card");
		this.divElement.classList.add("cardInHand");
		this.divElement.addEventListener("click", playCard);
		this.divElement.card = this;
		switch (suit) {
			case 1:
				this.divElement.textContent = "♥" + number;
				this.divElement.style.color = "#ff0000";
				break;
			case 2:
				this.divElement.textContent = "♣" + number;
				break;
			case 3:
				this.divElement.textContent = "♦" + number;
				this.divElement.style.color = "#ff0000";
				break;
			case 4:
				this.divElement.textContent = "♠" + number;
				break;
		}

	}
}

//fix for multiple hands
function playCard(e) {
	const cardDivElement = e.target;
	if (isPlayable(cardDivElement.card)) {
		cardDivElement.classList.remove("cardDivElementInHand");
		cardDivElement.style.gridColumn = cardDivElement.card.number;
		cardDivElement.style.gridRow = cardDivElement.card.suit;
		board.addCard(hands[0].getCard(cardDivElement.card));
		console.log(board.cards[0]);
		document.querySelector("#gameboard").appendChild(cardDivElement);
		cardDivElement.removeEventListener("click", playCard);
	}
}

function redrawHand() {
	const cardHolder = document.querySelector("#cardholder");
	hands[0].sortCards();
	let cards = hands[0].cards;
	for (let i = 0; i < cards.length; i++) {
		if (cardHolder.contains(cards[i].divElement)) {
			cardHolder.removeChild(cards[i].divElement);
		}
	}
	for (let i = 0; i < cards.length; i++) {
		cardHolder.appendChild(cards[i].divElement);
	}

}

function isPlayable(card) {
	if (card.number == 7) return true;
	for (let i = 0; i < board.cards.length; i++) {
		if (card.number < 7) {
			if (board.cards[i].number == card.number + 1) return true;
		}
		if (card.number > 7) {
			if (board.cards[i].number == card.number - 1) return true;
		}
	}
	return false;
}

let deck = new Deck();
deck.fillDeck();
deck.shuffle();
let board = new Deck();
let hands = deck.dealAllCards(3);
redrawHand();

// class TestClass {
// 	constructor() {
// 		this.cards = [];
// 	}
// }

// class TestObject {
// 	constructor() {
// 		this.number = 1;
// 	}

// 	testFunction() {

// 	}
// }

// test = new TestClass();
// test.cards.push(new TestObject());
// test.cards.push(new TestObject());
// console.log(test.cards);

//AI
// weighted decisions, how many of same suit still in hand
// just increase chance, not always best decision
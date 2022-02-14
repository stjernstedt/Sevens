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

	findCardById(id) {
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].id == id) {
				return this.cards[i];
			}
		}
		return false;
	}

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
		this.id = number + ((suit - 1) * 13);
		this.divElement = document.createElement("div");
		this.divElement.id = this.id;
		this.divElement.classList.add("card");
		this.divElement.classList.add("cardInHand");
		this.divElement.addEventListener("click", cardClickHandler);
		// this.divElement.addEventListener("click", reportId);
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

function playCard(hand, card) {
	if (isPlayable(card)) {
		card.divElement.classList.remove("cardInHand");
		card.divElement.classList.remove("cardInComputerHand");
		card.divElement.style.gridColumn = card.number;
		card.divElement.style.gridRow = card.suit;
		board.addCard(hands[hand].getCard(card));
		document.querySelector("#gameboard").appendChild(card.divElement);
		card.divElement.removeEventListener("click", cardClickHandler);
		if (hands[hand].cards.length == 0) {
			playerTurn == 0 ? gameOver(true) : gameOver(false);
		}

		playerTurn++;
	}
}

function cardClickHandler(e) {
	// console.log("player played----------");
	playCard(0, e.target.card);
	playRound();
}

function redrawHand() {
	const cardHolder = document.querySelector("#cardHolder");
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

function redrawComputerHands() {
	const cardHolders = document.querySelectorAll(".computerCards");
	for (let i = 0; i < 2; i++) {
		hands[i + 1].sortCards();
		let cards = hands[i + 1].cards;

		for (let j = 0; j < cards.length; j++) {
			cards[j].divElement.classList.add("cardInComputerHand");
			if (cardHolders[i].contains(cards[j].divElement)) {
				cardHolders[i].removeChild(cards[j].divElement);
			}
		}
		for (let j = 0; j < cards.length; j++) {
			cardHolders[i].appendChild(cards[j].divElement);
		}
	}
}

function isPlayable(card) {
	if (card.number == 7) return true;
	for (let i = 0; i < board.cards.length; i++) {
		if (card.number < 7) {
			if (board.cards[i].id == card.id + 1) {
				// console.log("board card: " + board.cards[i].id);
				// console.log("      card: " + card.id);
				// console.log("-----------");
				return true;
			}
		}
		if (card.number > 7) {
			if (board.cards[i].id == card.id - 1) {
				// console.log("board card: " + board.cards[i].id);
				// console.log("      card: " + card.id);
				// console.log("-----------");
				return true
			};
		}
	}
	return false;
}

function findFirstPlayer() {
	for (let i = 0; i < hands.length; i++) {
		if (hands[i].findCardById(7)) return i;
	}
}

function playRound() {
	if (board.cards.length == 0) {
		let card = hands[playerTurn].findCardById(7);
		playCard(playerTurn, card);
	}

	if (playerTurn >= hands.length) playerTurn = 0;
	let canditates = [];
	for (let i = 0; i < hands[playerTurn].cards.length; i++) {
		if (isPlayable(hands[playerTurn].cards[i])) {
			canditates.push(hands[playerTurn].cards[i]);
		}
	}
	if (canditates.length == 0) {
		console.log("can't play");
		playerTurn++;
		playRound();
	} else {
		if (playerTurn != 0) {
			playCard(playerTurn, canditates[0]);
			canditates = [];
			playRound();
		}
	}
}

function reportId(e) {
	console.log(e.target.card.id);
}

function gameOver(isPlayer) {
	isPlayer ? alert("You Win!") : alert("You lose!");
	newGame();
}

function newGame() {
	let gameBoard = document.querySelector("#gameboard");
	while (gameBoard.hasChildNodes()) {
		gameBoard.removeChild(gameBoard.firstChild);
	}
	deck = new Deck();
	deck.fillDeck();
	deck.shuffle();
	board = new Deck();
	hands = deck.dealAllCards(3);
	redrawHand();
	redrawComputerHands();
	playerTurn = findFirstPlayer();
	playRound();
}

let deck, board, hands, playerTurn;
newGame();


//AI
// weighted decisions, how many of same suit still in hand
// just increase chance, not always best decision
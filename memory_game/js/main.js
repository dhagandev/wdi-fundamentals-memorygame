var cards = [
		{
			rank: 'queen',
			suit: 'hearts',
			cardImage: 'images/queen-of-hearts.png'
		},
		{
			rank: 'queen',
			suit: 'diamonds',
			cardImage: 'images/queen-of-diamonds.png'
		},
		{
			rank: 'king',
			suit: 'hearts',
			cardImage: 'images/king-of-hearts.png'
		},
		{
			rank: 'king',
			suit: 'diamonds',
			cardImage: 'images/king-of-diamonds.png'
		}

	];
var cardsInPlay = [];
var matchMade = 0;
var score = 0;

function reset() {
	var resetButton = document.getElementById('reset');
	resetButton.style.display = "block";
	resetButton.addEventListener('click', function() {
		matchMade = 0;
		score = 0;
		var gameBoard = document.getElementById('game-board');
		while (gameBoard.firstChild) {
			gameBoard.removeChild(gameBoard.firstChild);
		}
		createBoard();
	});
}

function updateScore() {
	document.getElementById('score').innerHTML = "Score: " + score;
}

function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		cardsInPlay = [];
		matchMade += 1;
		score += 5;
		updateScore();
		alert("You found a match!");

		if (matchMade === cards.length/2) {
			var resetElement = document.getElementById('reset');
			resetElement.classList.add("button");
			reset();
		}
	}
	else {
		score -= 1;
		updateScore();
		alert("Sorry, try again.");
	}
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
};

function createBoard() {
	document.getElementById('reset').style.display = "none";
	updateScore();
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		
		document.getElementById('game-board').appendChild(cardElement);
	}
}

window.onload = function() {
	createBoard();
};
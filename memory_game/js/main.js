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

function shuffleArray(array) {
	for (var i = array.length -1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

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
	var card1 = cards[cardsInPlay[0]];
	var card2 = cards[cardsInPlay[1]];
	if (card1.rank === card2.rank) {
		matchMade += 1;
		score += 5;
		updateScore();
		setTimeout(function() {
			alert("You found a match!");
		}, 10);

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
		var card1Element = document.querySelector("img[data-id=\"" + cardsInPlay[0] + "\"]");
		var card2Element = document.querySelector("img[data-id=\"" + cardsInPlay[1] + "\"]");
		setTimeout(function() {
			card1Element.src = "images/back.png";
			card2Element.src = "images/back.png";
		}, 20);
	}
	cardsInPlay = [];
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	cardsInPlay.push(cardId);
	if (cardsInPlay.length === 2) {
		setTimeout(function() {
			checkForMatch();
		}, 10);
	}
};

function createBoard() {
	shuffleArray(cards);
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
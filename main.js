const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timeLeft");
const bonusDisplay = document.getElementById("bonus");
const squares = document.querySelectorAll(".square");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
let previousActiveIndex = -1;
let tickTimeout;
let randomNumber;
let selectedSquare;

squares.forEach((square) => {
	square.addEventListener("click", handleClick);
});

startButton.addEventListener("click", () => {
	resetStats();
	renderScore();
	isRunning = true;
	activateSquare();
	tick();
});

resetButton.addEventListener("click", resetStats);

function resetStats() {
	scoreDisplay.innerText = "";
	timeDisplay.innerText = "";
	bonusDisplay.innerText = "";
	score = 0;
	streak = 0;
	timeLeft = 10;
	isRunning = false;
	deactivateSquares();
	clearTimeout(tickTimeout);
}

function tick() {
	if (!timeLeft) {
		deactivateSquares();

		squares.forEach((square) => {
			square.removeEventListener("click", handleClick);
		});

		scoreDisplay.innerText = `Your Score Was: ${score}!`;
		timeDisplay.innerText = "";
		bonusDisplay.innerText = "";
		isRunning = false;
		score = 0;
		streak = 0;
		timeLeft = 10;
		return;
	}

	console.log(timeLeft);

	timeDisplay.innerText = `Time Left: ${timeLeft}`;
	timeLeft--;

	tickTimeout = setTimeout(tick, 1000);
}

function activateSquare() {
	randomNumber = Math.floor(Math.random() * 9); //random number from 0 to 8

	while (randomNumber === previousActiveIndex) {
		randomNumber = Math.floor(Math.random() * 9); //random number from 0 to 8
	}

	previousActiveIndex = randomNumber;

	selectedSquare = squares[randomNumber];

	selectedSquare.classList.add("active");
}

function deactivateSquares() {
	squares.forEach((square) => {
		square.classList.remove("active");
	});
}

function renderScore() {
	scoreDisplay.innerText = `Score: ${score}`;
}

function handleClick(event) {
	if (isRunning) {
		const clickedSquare = event.currentTarget;
		if (clickedSquare.classList.contains("active")) {
			clickedSquare.classList.remove("active");

			streak++;

			if (streak % 5 == 0 && streak != 0) {
				score += 3;
				bonusDisplay.innerText = `Bonus! +3`;
			} else {
				score++;
				bonusDisplay.innerText = ``;
			}

			activateSquare();
		} else {
			streak = 0;

			if (score > 0) score--;
		}

		renderScore();
	}
}

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timeLeft");
const bonusDisplay = document.getElementById("bonus");
const highscoreDisplay = document.getElementById("highscore");
const squares = document.querySelectorAll(".square");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const gameDurationInMS = 1000;
const streakHitpoint = 5;
const bonus = 3;

let previousActiveIndex = -1;
let tickTimeout;
let activeTimeout;
let lastRoundScore;
let highscore = 0;
let score;
let streak;
let timeLeft;
let isRunning;

if (localStorage.getItem("highscore") !== null) {
	highscore = parseInt(localStorage.getItem("highscore"));
}

highscoreDisplay.innerText = `Highscore: ${highscore}`;

resetStats();

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
	clearTimeout(activeTimeout);
}

function tick() {
	if (!timeLeft) {
		deactivateSquares();

		if (score > highscore) {
			highscore = score;
			localStorage.setItem("highscore", highscore);
		}

		lastRoundScore = score;

		resetStats();

		scoreDisplay.innerText = `Your Score Was: ${lastRoundScore}!`;
		highscoreDisplay.innerText = `Highscore: ${highscore}`;
		return;
	}

	console.log(timeLeft);

	timeDisplay.innerText = `Time Left: ${timeLeft}`;
	timeLeft--;

	tickTimeout = setTimeout(tick, gameDurationInMS);
}

function activateSquare() {
	let randomNumber = Math.floor(Math.random() * squares.length); //random number from 0 to 8

	while (randomNumber === previousActiveIndex) {
		randomNumber = Math.floor(Math.random() * squares.length); //random number from 0 to 8
	}

	previousActiveIndex = randomNumber;

	let selectedSquare = squares[randomNumber];

	deactivateSquares();
	selectedSquare.classList.add("active");
	activeTimeout = setTimeout(() => {
		deactivateSquares();
		activateSquare();
	}, gameDurationInMS);
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

			if (streak % streakHitpoint == 0 && streak != 0) {
				score += bonus;
				bonusDisplay.innerText = `Bonus! +${bonus}`;
			} else {
				score++;
				bonusDisplay.innerText = ``;
			}

			clearTimeout(activeTimeout);
			activateSquare();
		} else {
			streak = 0;

			if (score > 0) score--;
		}

		renderScore();
	}
}

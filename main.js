const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timeLeft");
const bonusDisplay = document.getElementById("bonus");
const squares = document.querySelectorAll(".square");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

let score = 0;
let isRunning = false;
let timeLeft = 10;
let streak = 0;

startButton.addEventListener("click", () => {
	if (!isRunning) {
		isRunning = true;
		activateSquare();
		renderScore();
		tick();
	}
});

resetButton.addEventListener("click", () => {
	score = 0;
	renderScore();
	deactivateSquares();
});

function tick() {
	if (!timeLeft) {
		deactivateSquares();
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

	setTimeout(tick, 1000);
}

function activateSquare() {
	const randomNumber = Math.floor(Math.random() * 9); //random number from 0 to 8
	const selectedSquare = squares[randomNumber];

	selectedSquare.classList.add("active");
	selectedSquare.addEventListener("click", selectNextSquare);
}

// here you pass the event not the DOM object.
function selectNextSquare(event) {
	let selectedSquare = event.currentTarget;

	if (!selectedSquare.classList.contains("active")) return;

	streak++;

	if (streak % 5 == 0 && streak != 0) {
		score += 3;
		bonusDisplay.innerText = `Bonus! +3`;
	} else {
		score++;
		bonusDisplay.innerText = ``;
	}

	renderScore();
	selectedSquare.classList.remove("active");

	if (timeLeft) setTimeout(activateSquare, 200);
}

function renderScore() {
	scoreDisplay.innerText = `Score: ${score}`;
}

function deactivateSquares() {
	squares.forEach((square) => {
		square.classList.remove("active");
	});
}

squares.forEach((square) =>
	square.addEventListener("click", () => {
		if (!square.classList.contains("active") && score > 0) {
			streak = 0;
			score--;
			renderScore();
		}
	}),
);

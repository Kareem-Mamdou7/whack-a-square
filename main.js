const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timeLeft");
const squares = document.querySelectorAll(".square");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

let score = 0;
let streak = 0;
let timeLeft = 10;

startButton.addEventListener("click", () => {
	activateSquare();
	renderScore();
	tick();
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

	score++;
	renderScore();
	selectedSquare.classList.remove("active");

	setTimeout(activateSquare, 200);
}

function renderScore() {
	scoreDisplay.innerText = `Score: ${score}`;
}

function deactivateSquares() {
	squares.forEach((square) => {
		square.classList.remove("active");
	});
}

const scoreDisplay = document.getElementById("score");
const squaresArr = document.querySelectorAll(".square");
console.log(squaresArr);
let score = 0;
let previousRandomNumber;

function activateSquare() {
	const randomNumber = Math.floor(Math.random() * 9); //random number from 0 to 8
	previousRandomNumber = randomNumber;

	const selectedSquare = squaresArr[randomNumber];

	selectedSquare.classList.add("active");

	selectedSquare.addEventListener("click", selectNextSquare);
}

// here you pass the event not the DOM object.
function selectNextSquare(event) {
	let selectedSquare = event.currentTarget;

	if (!selectedSquare.classList.contains("active")) return;

	score++;
	scoreDisplay.innerText = `Score: ${score}`;
	selectedSquare.classList.remove("active");

	setTimeout(activateSquare, 500);
}

activateSquare();

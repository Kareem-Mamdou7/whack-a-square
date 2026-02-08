const scoreDisplay = document.getElementById("score");
let score = 0;
let previousRandomNumber;

function activateSquare() {
	const randomNumber = Math.floor(Math.random() * 9) + 1; //random number from 1 to 9
	previousRandomNumber = randomNumber;

	console.log(randomNumber);

	const selectedSquare = document.getElementById(`${randomNumber}`);

	selectedSquare.classList.add("active");

	selectedSquare.addEventListener("click", selectNextSquare);
}

// here you pass the event not the DOM object.
function selectNextSquare(event) {
	score++;
	let selectedSquare = event.currentTarget;
	scoreDisplay.innerText = `Score: ${score}`;
	selectedSquare.classList.remove("active");
	selectedSquare.removeEventListener("click", selectNextSquare);

	setTimeout(activateSquare, 500);
}

activateSquare();

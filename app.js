const gameContainer = document.getElementById('game-container');
const dino = document.getElementById('dino');

let isJumping = false;
let score = 0;

function jump() {
	if (!isJumping) {
		isJumping = true;
		let position = 0;
		const jumpInterval = setInterval(() =>{
			if (position === 150) {
				clearInterval(jumpInterval);
				const fallInterval = setInterval(() =>{
					if (position === 0) {
						clearInterval(fallInterval);
						isJumping = false;
					}else {
						position -= 10;
						dino.style.bottom = position + "px";
					}
				}, 20);
			} else {
				position += 10;
				dino.style.bottom = position + "px";
			}
		}, 20);
	}

}

function createObstacle() {
	const obstacle = document.createElement("div");
	obstacle.className = "obstacle";
	obstacle.style.left = gameContainer.offsetWidth + "px";
	gameContainer.appendChild(obstacle);

	const moveInterval = setInterval(() => {
		const obstacleLeft = parseInt(obstacle.style.left);
		const dinoBottom = parseInt(dino.style.bottom);

		if (
			obstacleLeft <= 50 && obstacleLeft > 40 && dinoBottom <= 40

			) {
			clearInterval(moveInterval);
			alert("Nimodo compita, ya perdiste " + score);
		}else if( obstacleLeft <= 0){
			obstacle.remove();
			clearInterval(moveInterval);
			createObstacle();
		}else{
			obstacle.style.left = (obstacleLeft -10) +"px";
		}
	}, 50)
}

document.addEventListener("keydown", (event) =>{
	if (event.code === "Space") {
		score++;
		jump();
	}
});

createObstacle();
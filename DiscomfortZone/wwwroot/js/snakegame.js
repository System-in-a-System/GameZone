const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// create the unit
const box = 24;

// create the snake
let snake = [];

// placement snake head position 
snake[0] = {
    x: 10 * box,
    y: 10 * box
};

//load audio
let dead = new Audio();
dead.src = "./assets/snakegame/sounds/dead.mp3";

let eat = new Audio();
eat.src = "./assets/snakegame/sounds/eat.mp3";

// load images
const foodImg = new Image();
foodImg.src = "./assets/snakegame/field/food.png";

const ground = new Image();
ground.src = "./assets/snakegame/field/ground.jpg";

// create the food
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 18 + 3) * box
}


// create the score var
let score = 0;

//control the snake direction
let snakeDirection;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && snakeDirection != "RIGHT") {
        snakeDirection = "LEFT";

    } else if (key == 38 && snakeDirection != "DOWN") {
        snakeDirection = "UP";


    } else if (key == 39 && snakeDirection != "LEFT") {
        snakeDirection = "RIGHT";

    } else if (key == 40 && snakeDirection != "UP") {
        snakeDirection = "DOWN";

    }
}

// check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the game
function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "lightblue" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (snakeDirection == "LEFT") snakeX -= box;
    if (snakeDirection == "UP") snakeY -= box;
    if (snakeDirection == "RIGHT") snakeX += box;
    if (snakeDirection == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;

        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 18 + 3) * box
        }
        eat.play();

    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    gameOver = snakeX-- < box || snakeX > 20 * box || snakeY-- < 3 * box || snakeY > 21 * box || collision(newHead, snake);
    if (gameOver) {
        clearInterval(game);
        dead.play();
        alert('game over... press *ctrl+R* to play again');

    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 200 ms
game = setInterval(draw, 100);
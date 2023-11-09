const startGame = document.querySelector(".strtButt")
const board = document.querySelector(".board")
const over = document.querySelector(".gameover")

if (localStorage.getItem("HighScore") === null) {
    localStorage.setItem("HighScore", 0)
}
let LocalScore = localStorage.getItem("HighScore")
// function to create boxes 
function grid() {
    for (let i = 0; i < 400; i++) {
        let div = document.createElement("div");
        board.appendChild(div);
        div.classList.add("boarddiv")
    }
}
grid();
//random fruits
let fruits = ["🍈", "🍉", "🍊", "🍋", " 🍌", "🍍", "🍎"];
let randomFriutsIndex = Math.floor(Math.random() * fruits.length);
let randomFruits = fruits[randomFriutsIndex];



// boxes to get random div and add friut
const boxes = document.querySelectorAll(".board div")
let randomBoxIndex = Math.floor(Math.random() * boxes.length);
let randombox = boxes[randomBoxIndex];

// current scrore and highscore
let currentScore = 0;
let boxesrow = 20;
let currentScorediv = document.querySelector(".currentScore");
let heighScorediv = document.querySelector(".heighScore");


//snake
let snake = document.createElement("div")
snake.classList.add("snake");

board.appendChild(snake);
const snakeDiv = document.querySelector(".snake");
let X = 0
let Y = 0
let directionX = 0;
let directionY = 0;
let snakeIndex;
let snakebody = [];


function moveSnake() {
    X += directionX * 20;
    Y += directionY * 20;

    if (X < 0 || X >= 400 || Y < 0 || Y >= 400) {



        setInterval(playagainfun, 800)

    } else {
        snakeDiv.style.left = X + "px";
        snakeDiv.style.top = Y + "px";

        let indexX = X / 20
        snakeIndex = indexX + Y

        for (let i = snakebody.length - 1; i > 0; i--) {

            snakebody[i].style.left = snakebody[i - 1].style.left;
            snakebody[i].style.top = snakebody[i - 1].style.top;
        }

        if (snakebody.length > 0) {
            snakebody[0].style.left = X - directionX * 20 + "px";
            snakebody[0].style.top = Y - directionY * 20 + "px";

        }


    }
    return snakeIndex;
}

let snakebodydiv = document.querySelectorAll(".snakebody")



function growSnake() {
    let newbody = document.createElement("div");
    newbody.classList.add("snakebody")
    snakebody.push(newbody)
    board.appendChild(newbody)


}
const playagain = document.querySelector(".newGame")


heighScorediv.innerHTML = `High Score:${LocalScore}`
currentScorediv.innerText = `Your Score:0`
// start button funtion
startGame.addEventListener("click", start)

function start() {

    randombox.innerHTML = `<p>${randomFruits}</p>`

    currentScorediv.style.display = "block"

    //snake movement

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp") {
            directionY = -1;
            directionX = 0;
        } else if (e.key === "ArrowDown") {
            directionY = 1;
            directionX = 0;
        } else if (e.key === "ArrowLeft") {
            directionX = -1;
            directionY = 0;
        } else if (e.key === "ArrowRight") {
            directionX = 1;
            directionY = 0;
        }

        if (snakeIndex == randomBoxIndex) {
            randombox.innerHTML = ""
            randomBoxIndex = Math.floor(Math.random() * boxes.length);
            randombox = boxes[randomBoxIndex];
            randomFriutsIndex = Math.floor(Math.random() * fruits.length);
            randomFruits = fruits[randomFriutsIndex];
            randombox.innerHTML = `<p>${randomFruits}</p>`
            currentScore += 1;
            currentScorediv.innerText = `Your Score: ${currentScore}`
            growSnake()



            if (currentScore >= LocalScore) {
                localStorage.setItem("HighScore", currentScore)
            }

        }


    })

    function speed() {

    }






}

function playagainfun() {
    over.innerText = "GAME OVER";
    window.location.reload()

}
const move = setInterval(function () {
    moveSnake();
    checkCollision();
}, 300);

function checkCollision() {
    for (let i = 0; i < snakebody.length; i++) {
        if (snakebody[i].style.left === snakeDiv.style.left && snakebody[i].style.top === snakeDiv.style.top) {

            over.innerText = "GAME OVER";
            window.location.reload();
        }
    }
}
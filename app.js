const grid = document.querySelector(".grid-container")
const gridSquares = []
let currDotIndex
let running = false
let score = 0
const resetButton = document.querySelector(".reset-button")
const startButton = document.querySelector(".start-button")

function drawGrid() {
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            drawSquare()
        }
    }
}

function drawDot() {
    let pos = Math.round(Math.random() * 256)
    gridSquares[pos].className = 'dot'
    currDotIndex = pos
}

function drawSquare() {
    let div = document.createElement('div')
    div.className = 'grid-square'
    grid.appendChild(div)
    gridSquares.push(div)
}

function startGame() {
    drawGrid()
    drawDot()
    game()
}
startGame()

async function game() {

    const waitFor = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), time)
        });
    };

    while(running) {
        updateScore()
        eraseDot()
        drawDot()
        running = false
        await waitFor(1000)
    }
    onLost()
}

function eraseDot() {
    gridSquares[currDotIndex].className = 'grid-square'
}

function addEventListeners() {
    for (let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('click', () => {
            if(gridSquares[i].className === 'dot') {
                gridSquares[i].className = 'grid-square'
                running = true
                score++
            }
        });
    }
}
addEventListeners()

startButton.addEventListener('click', newGame)

resetButton.addEventListener('click', resetGame)

function resetGame() {
    running = false
    eraseDot()
    score = 0
    updateScore()
}

function newGame() {
    if(running === false) {
        running = true
        game()
    }
}


function updateScore() {
    let scoreText = document.querySelector(".header")
    if (score > 0) scoreText.innerHTML = score.toString()
    else scoreText.innerHTML = 'dots'
}

function onLost() {
    alert("YOU LOST :Cringe")
}


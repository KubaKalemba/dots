const grid = document.querySelector(".grid-container")
const scoreText = document.querySelector(".header")
const gridSquares = []
let currDotIndex
let running = false
let didLose = true;
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

function drawDot(className) {
    let pos = Math.round(Math.random() * 256)
    gridSquares[pos].className = className
    currDotIndex = pos
}

function drawSquare() {
    let div = document.createElement('div')
    div.className = 'grid-square'
    grid.appendChild(div)
    gridSquares.push(div)
}

drawGrid()


async function game() {

    const waitFor = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), time)
        });
    };

    while(running) {
        updateScore()
        drawDot(chooseDot())
        running = false
        await waitFor(1200)
        eraseDot()
    }
    onLost()
}

function eraseDot() {
    gridSquares[currDotIndex].className = 'grid-square'
}

function addEventListeners() {
    for (let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('click', () => {
            handleClick(i)
        });
    }
}
addEventListeners()

function handleClick(i) {
    if(gridSquares[i].className === 'dot') {
        gridSquares[i].className = 'grid-square'
        running = true
        score++
    } else if(gridSquares[i].className === 'purple-dot') {
        gridSquares[i].className = 'grid-square'
        running = true
        score++
    } else if(gridSquares[i].className === 'pink-dot') {
        gridSquares[i].className = 'grid-square'
        running = true
        score++
    } else if(gridSquares[i].className === 'blue-dot') {
        gridSquares[i].className = 'grid-square'
        running = true
        score++
    } else if(gridSquares[i].className === 'gold-dot') {
        gridSquares[i].className = 'grid-square'
        running = true
        score++
    }
}

startButton.addEventListener('click', newGame)

function newGame() {
    if(didLose === true) {
        didLose = false
        running = true
        score = 0
        game().then(onLost)
    }
}


function updateScore() {

    if (score > 0) scoreText.innerHTML = score.toString()
    else scoreText.innerHTML = 'dots'
}

function onLost() {
    scoreText.innerHTML = 'you lost'
    didLose = true
}

function chooseDot() {
    let num = Math.round(Math.random()*1000)
    if(num < 600) {
        return 'dot'
    } else if(num < 800) {
        return 'purple-dot';
    } else if(num < 882) {
        return 'pink-dot'
    } else if(num < 999) {
        return 'blue-dot'
    } else {
        return 'gold-dot'
    }
}


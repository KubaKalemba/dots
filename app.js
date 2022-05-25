const grid = document.querySelector(".grid-container")
const gridSquares = []
let currDotIndex;
let running = true;
let score = 0;

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

function updateScore() {
    let scoreText = document.querySelector(".header")
    if (score > 0) scoreText.innerHTML = score.toString();
}

function onLost() {

}


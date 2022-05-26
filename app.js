const grid = document.querySelector(".grid-container")
const scoreText = document.querySelector(".header")
const highScoreLabel = document.querySelector(".highscore")
const gridSquares = []
const timerIterations = 100
let currDotIndex
let running = false
let didLose = true;
let score = 0
let highScore = 0
const resetButton = document.querySelector(".reset-button")
const startButton = document.querySelector(".start-button")
let speed = 1000
let multiplier = 1
const timer = document.querySelector('.timer')

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

const waitFor = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    });
};

async function game() {
    await countDown()
    while(running) {
        updateScore()
        let currDot = chooseDot()
        drawDot(currDot)
        if(currDot !== 'black-dot')
            running = false

        for (let i = 0; i < timerIterations; i++){
            await waitFor(speed / timerIterations)
            updateTimer(i)
        }
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
    if(gridSquares[i].className === 'grid-square') return

    if(gridSquares[i].className === 'dot') {
        score += multiplier
    } else if(gridSquares[i].className === 'purple-dot') {
        score+= multiplier
        speed -= 100
    } else if(gridSquares[i].className === 'pink-dot') {
        score += 2*multiplier
    } else if(gridSquares[i].className === 'blue-dot') {
        score += multiplier
        incMultiplier('blue-dot')
    } else if(gridSquares[i].className === 'cyan-dot') {
        incMultiplier('cyan-dot')
    }
    else if(gridSquares[i].className === 'gold-dot') {
        score += 10*multiplier
        incMultiplier('gold-dot')
    } else if(gridSquares[i].className === 'black-dot') {
        running = false
    }
    gridSquares[i].className = 'grid-square'
    running = true
}

startButton.addEventListener('click', newGame)

function newGame() {
    if(didLose === true) {
        scoreText.innerHTML = 'dots'
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

function updateHighScore() {
    document.cookie = "HIGHSCORE = "+highScore.toString()+"; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/"
    if(score > highScore) highScore = score;
    highScoreLabel.innerHTML = document.cookie.slice(3,document.cookie.length)
    console.log(document.cookie.slice(0,3))
}

function onLost() {
    timer.innerHTML = score.toString()
    scoreText.innerHTML = 'you lost'
    didLose = true
    multiplier = 1
    speed = 1000
    updateHighScore()
}

function chooseDot() {
    let num = Math.round(Math.random()*1000)
    if(num < 600) {
        if(num%10 === 0) {
            return 'black-dot'
        }
        return 'dot'
    } else if(num < 800) {
        return 'purple-dot';
    } else if(num < 882) {
        return 'pink-dot'
    } else if(num < 931) {
        return 'blue-dot'
    } else if(num < 998) {
        return 'cyan-dot'
    } else {
        return 'gold-dot'
    }
}

function updateTimer(i) {
    let sec = i
    let first = i%10
    let second = i%100
    let third = i%1000
    timer.innerHTML = sec + '.' + first + second + third
}

function incMultiplier(dot) {
    if(dot === 'blue-dot') {
        multiplier *= 2
    }
    if(dot === 'cyan-dot') {
        multiplier *= 5
    }
    if(dot === 'gold-dot') {
        multiplier *= 20
    }
}

async function countDown() {
    timer.innerHTML = "3"
    await waitFor(1000)
    timer.innerHTML = "2"
    await waitFor(1000)
    timer.innerHTML = "1"
    await waitFor(1000)
}


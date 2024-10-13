const screens = document.querySelectorAll('.screen');
const choose_athlete_btns = document.querySelectorAll('.choose-athlete-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_athlete = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_athlete_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_athlete = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createathlete, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createathlete() {
    const athlete = document.createElement('div')
    athlete.classList.add('athlete')
    const { x, y } = getRandomLocation()
    athlete.style.top = `${y}px`
    athlete.style.left = `${x}px`
    athlete.innerHTML = `<img src="${selected_athlete.src}" alt="${selected_athlete.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    athlete.addEventListener('click', catchathlete)

    game_container.appendChild(athlete)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchathlete() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addathletes()
}

function addathletes() {
    setTimeout(createathlete, 1000)
    setTimeout(createathlete, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
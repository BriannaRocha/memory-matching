/*-------------------------------- Constants --------------------------------*/
const cardContainer = document.querySelector(".container")
const cardFront = document.querySelectorAll(".front")
const cardList = ["homer.png", "marge.png", "bart.png", "lisa.png", "maggie.png", "krusty.png", "burns.png", "ned.png"]


/*---------------------------- Variables (state) ----------------------------*/
let board, moves, match, activeCard, mismatchShowing, winner, lose, timeLeft, timerIntervalId


/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll('.card')
const movesEl = document.querySelector('#moves')
const matchEl = document.querySelector('#matches')
const timerEl = document.querySelector('#timer')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset-button')

/*----------------------------- Event Listeners -----------------------------*/
cardEls.forEach(function(cardEl) {
  cardEl.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = []
  moves = 0
  match = 0
  activeCard = null
  mismatchShowing = false
  winner = false
  lose = false
  timeLeft = 600
  setupBoard()
  clearInterval(timerIntervalId)
  timerIntervalId = null
  render()
}

function setupBoard() {
  let cards = cardList.concat(cardList)
  cards = shuffleCards(cards)
  cards.forEach((card) => {
    let cardObj = {
      name: card, 
      isFlipped: false
    }
    board.push(cardObj)
  })
}

// shuffle cards using Fisher-Yates shuffle function from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976

function shuffleCards(cards) {
  let currentIndex = cards.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}

function startTimer() {
	if (timerIntervalId) {
		return
	}
  renderTime()
	timerIntervalId = setInterval(tick, 1000)
}

function tick() {
	timeLeft--
  if (timeLeft === 0) {
    clearInterval(timerIntervalId)
    lose = true
    render()
  } else {
    renderTime()
  }
}

function renderTime() {
  let min = Math.floor(timeLeft / 60)
  let sec = timeLeft % 60
  if (sec < 10) {
    timerEl.textContent = `${min}:0${sec}`
  } else {
    timerEl.textContent = `${min}:${sec}`
  }
}

function handleClick(evt) {
  const cardIdx = parseInt(evt.target.id.replace('card', ''))
  if (board[cardIdx].isFlipped || mismatchShowing || lose) {
    return 
  }
  if (activeCard !== null) {
    flipCard(cardIdx)
    checkForMatch(cardIdx)
  } else {
    activeCard = cardIdx
    flipCard(cardIdx)
  }
  moves++
  startTimer() 
  checkForWinner()
  render()
}

function flipCard (cardIdx) {
  board[cardIdx].isFlipped = !board[cardIdx].isFlipped
}

function checkForMatch(cardIdx) {
  if (board[cardIdx].name === board[activeCard].name) {
    match++
    activeCard = null
  } else {
    mismatchShowing = true
    setTimeout(() => {
      board[cardIdx].isFlipped = false
      board[activeCard].isFlipped = false
      render()
      activeCard = null
      mismatchShowing = false
    }, 1200)
  }
}

function checkForWinner() {
  if (match === 8) {
    clearInterval(timerIntervalId)
    winner = true
    confetti.start(3000)

  }
}

function updateBoard() {
  board.forEach(function(card, idx) {
    if (card.isFlipped) {
      // cardEls[idx].textContent = card.name
      cardEls[idx].style.backgroundImage = `url(assets/images/${card.name}`
    } else {
      cardEls[idx].style.backgroundImage = "url(assets/images/cardback.png"
    }
  })
} 

function updateStats() {
  movesEl.textContent = moves
  matchEl.textContent = match
}

function updateMessage() {
  if (!winner && !lose){
    messageEl.textContent = "Click a card, any card!"
  } else if (winner) {
    messageEl.textContent = "Woo-hoo! I am so smart! S-M-R-T!"
  } else {
    messageEl.textContent = "Trying is the first step towards failure!"
  }
}

function render() {
  updateBoard()
  updateStats()
  renderTime()
  updateMessage()
}

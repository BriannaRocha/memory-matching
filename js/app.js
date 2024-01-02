/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board, turn, match, score, winner 


/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll('.card')
const scoreEl = document.querySelector('#score')
const messageEl = document.querySelector('#message')
const resetBtn = document.getElementById('reset-button')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 0
  match = 0
  score = 0
  winner = false
  render()
  checkForWinner()
}

// function render() {
// 	renderHands();
// 	renderControls();
// 	if (winner) {
// 		renderWinnerMessage();
// 	} else {
// 		renderTurnMessage();
// 	}
// }


//// 1. Define the required variables used to track the state of the Gamepad
////  - Use variable named: ‘board’, ‘turn’, ‘match’, 'score', ‘winner’
//// 2. Store cached element references
////  - Create cashed elements for: cards, score, game status message, reset button
//// 3. Upon loading, the game state should be initialized, and a function should be called to render this game state
////  - Create an ‘init’ function
////  - Create 16 elements representing the cards from the deck
//  - Create a function that will shuffle and randomize card deck
//  - Create a score status representing how many matches scored and how many turns are left
// 4. The state of the game should be rendered to the user
//  - Create a render and update function to update card elements to indicate which cards have already been flipped
//  - Update card board, matches, score, and turns
// 5. Define the required constants
//   - Create a data array within its own file representing all possible cards and images used for the game
// 6. Handle a player clicking a card with a `handleClick` function
//  - Flip card if clicked on 
//  - On second card click, flip card and check for a match 
//  - Determine a match and have cards stay flipped if true and flip back down if false
//  - Update turns and score per turn
//  - Determine winner when all sets are matched 
//  - Determine loser when turns run out and not all cards are matched
// 7. Create Reset functionality
//  - Add a reset button with an event listener to clear the score and call the init function



const Player = (name) => {
  return { name }
}

const player1 = Player("Player 1")
const player2 = Player("Player 1")

const TicTacToe = (function () {
  let player1Turn = true
  const gameBoardDOM = document.body.querySelector(".game-board")
  const gameItems = document.body.querySelectorAll(".game-item")
  const gameBoard = []

  const makeMove = (e) => {
    let target = e.target.closest(".game-item")
    if (!target) return

    if (player1Turn) {
      if (e.target.textContent) return
      e.target.textContent = "o"
      player1Turn = !player1Turn
    } else {
      if (e.target.textContent) return
      e.target.textContent = "x"
      player1Turn = !player1Turn
    }
  }

  const startGame = () => {
    gameBoardDOM.addEventListener("click", (e) => makeMove(e))
  }

  return { startGame }
})()

console.log("tic-tac-toe")

TicTacToe.startGame()

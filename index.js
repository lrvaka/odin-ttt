const Player = (name) => {
  return { name }
}

const player1 = Player("Player 1")
const player2 = Player("Player 1")

const TicTacToe = (function () {
  let player1Turn = true
  const gameBoardDOM = document.body.querySelector(".game-board")
  const gameItems = document.body.querySelectorAll(".game-item")
  const winningMoves = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["2", "4", "6"],
    ["0", "4", "8"],
  ]
  let player1Moves = []
  let player2Moves = []

  const isWinningMove = (playerMove) =>
    winningMoves.some((e) => e.every((a) => playerMove.includes(a)))

  const makeMove = (e) => {
    let target = e.target.closest(".game-item")
    if (!target) return
    let move = e.target.getAttribute("data-key")

    if (player1Turn) {
      if (e.target.textContent) return

      e.target.textContent = "o"

      player1Moves.push(move)

      if (isWinningMove(player1Moves)) {
        console.log("Player 1 Wins!")
        endGame()
      } else {
        player1Turn = !player1Turn
      }
    } else {
      if (e.target.textContent) return

      e.target.textContent = "x"

      player2Moves.push(move)

      if (isWinningMove(player2Moves)) {
        console.log("Player 2 Wins!")
        endGame()
      } else {
        player1Turn = !player1Turn
      }
    }
  }

  const endGame = () => {
    gameBoardDOM.removeEventListener("click", makeMove)
    setTimeout(() => {
      gameItems.forEach((e) => {
        e.textContent = ""
        player1Moves = []
        player2Moves = []
      })
      startGame()
    }, 2500)
  }

  const startGame = () => {
    gameBoardDOM.addEventListener("click", makeMove)
  }

  return { startGame }
})()

TicTacToe.startGame()

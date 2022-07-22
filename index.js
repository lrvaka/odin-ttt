const Player = (name) => {
  return { name }
}

const player1 = Player("Player 1")
const player2 = Player("Player 1")

const TicTacToe = (function () {
  let player1Turn = true
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
  let player1Name = "Player 1"
  let player2Name = "Player 2"

  const endGameMsg = document.body.querySelector(".end-game-msg")
  const endGameTxt = endGameMsg.querySelector("p")
  const playerModal = document.body.querySelector(".modal-backdrop")
  const startGameBtn = document.body.querySelector(".start-game-btn")
  const gameBoardDOM = document.body.querySelector(".game-board")
  const gameItems = document.body.querySelectorAll(".game-item")
  const turnIndicator = document.body.querySelector(".game-turn-indicator")
  const player1Input = document.body.querySelector("#player_1")
  const player2Input = document.body.querySelector("#player_2")
  const modalStartGameBtn = document.body.querySelector(".modal-start-game-btn")

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
        endGameTxt.textContent = `${player1Name} Wins!`
        console.log("Player 1 Wins!")
        endGame()
      } else if (player1Moves.length + player2Moves.length == 9) {
        console.log("No winner")
        endGameTxt.textContent = `Tie Game!`
        endGame()
      } else {
        turnIndicator.textContent = `${player2Name}'s turn`
        player1Turn = !player1Turn
      }
    } else {
      if (e.target.textContent) return

      e.target.textContent = "x"

      player2Moves.push(move)

      if (isWinningMove(player2Moves)) {
        console.log("Player 2 Wins!")
        endGameTxt.textContent = `${player2Name} Wins!`
        endGame()
      } else {
        turnIndicator.textContent = `${player1Name}'s turn`
        player1Turn = !player1Turn
      }
    }
  }

  const endGame = () => {
    gameBoardDOM.removeEventListener("click", makeMove)

    endGameMsg.style.display = "flex"
    player1Turn = true
    setTimeout(() => {
      gameItems.forEach((e) => {
        e.textContent = ""
        player1Moves = []
        player2Moves = []
      })
      startGameBtn.removeAttribute("disabled")
      startGameBtn.classList.remove("disabled")
      turnIndicator.textContent = ""
      endGameMsg.style.display = "none"
    }, 2500)
  }

  const startGame = () => {
    playerModal.style.display = "block"
    gameBoardDOM.addEventListener("click", makeMove)
    startGameBtn.setAttribute("disabled", "")
    startGameBtn.classList.add("disabled")
  }

  const changePlayerName = () => {
    playerModal.style.display = "none"
    player1Name = player1Input.value || "Player 1"
    player2Name = player2Input.value || "Player 2"
    player1Input.value = ""
    player2Input.value = ""
    turnIndicator.textContent = `${player1Name}'s turn`
  }

  const init = () => {
    startGameBtn.addEventListener("click", startGame)
    modalStartGameBtn.addEventListener("click", changePlayerName)
  }

  return { init }
})()

TicTacToe.init()

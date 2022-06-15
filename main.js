//init
//déterminer à qui est le tour 
//détecter un click sur une des cases
//afficher le symbole sur la-dit case
//détecter si il y a un alignement de 3 (recherche necessaire)
//si oui, victoire pour le symbole qui à l'alignement
const $board = document.querySelector(".board")
const $winningMessage = document.querySelector(".winning-message")
const $winningMessageTxt = document.querySelector("#winningMessageText")
let winCondition = [
  [1, 3, 5],
  [7, 9, 11],
  [13, 15, 17],
  [1, 7, 13],
  [3, 9, 15],
  [5, 11, 17],
  [1, 9, 17],
  [5, 9, 13]
]
let turnCount
let whosTurn
let victoire
const init = () => {
  $board.addEventListener("click", e => handleClick(e))
  gameStart();
}

const handleClick = (e) => {
  if(e.target.classList.contains("x") || e.target.classList.contains("circle")){
    return
  }
  e.target.classList.add(whosTurn)
  $board.classList.remove(whosTurn)

  checkVictory()

  if(whosTurn === "x") {
    whosTurn = "circle"
  }else {
    whosTurn = "x"
  }
  console.log(victoire)
  if(turnCount >= 9 && !victoire) {
    gameOver()
    return
  }
  turnCount++
  $board.classList.add(whosTurn)
}

const checkVictory = () => {
  winCondition.forEach(e => {
    if($board.childNodes[e[0]].classList.contains(whosTurn) && $board.childNodes[e[1]].classList.contains(whosTurn) && $board.childNodes[e[2]].classList.contains(whosTurn)) {
      victoire = true
      gameOver()
      return
    }
  });
}

const gameStart = () => {
  victoire = false
  turnCount="1"
  whosTurn = "x"
  $board.classList.add(whosTurn)
}

const gameOver = () => {
  $winningMessage.classList.add("show")
  if(turnCount >= 9 && !victoire) {
    $winningMessageTxt.innerHTML = `Match nul`
    return 
  }
  $winningMessageTxt.innerHTML = `${whosTurn} a gagné !`   
}

init()
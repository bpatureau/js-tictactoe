//init
//déterminer à qui est le tour 
//détecter un click sur une des cases
//afficher le symbole sur la-dit case
//détecter si il y a un alignement de 3 (recherche necessaire)
//si oui, victoire pour le symbole qui à l'alignement
const $board = document.querySelector(".board")
const $winningMessage = document.querySelector(".winning-message")
const $winningMessageTxt = document.querySelector("#winningMessageText")
const $restartButton = document.querySelector("#restartButton")
const $cellule = document.querySelectorAll(".cell")
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
  $board.addEventListener("click", e => handleClickCase(e))
  $restartButton.addEventListener("click", e => handleClickRestart(e))
  gameStart();
}

const handleClickCase = (e) => {
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
const handleClickRestart = (e) => {
  e.preventDefault();
  console.log("ui")
  gameStart()
}

const checkVictory = () => {
  winCondition.forEach(e => {
    if($board.childNodes[e[0]].classList.contains(whosTurn) && $board.childNodes[e[1]].classList.contains(whosTurn) && $board.childNodes[e[2]].classList.contains(whosTurn)) {
      victoire = true
      gameOver()
    }
  });
}

const gameStart = () => {
  if($winningMessage.classList.contains("show")) {
    $winningMessage.classList.remove("show")
  }
  $cellule.forEach(e => {
    if(e.classList.contains("x")) {
      e.classList.remove("x")
    } 
    if(e.classList.contains("circle")) {
      e.classList.remove("circle")
    } 
  });
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
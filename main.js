const $board = document.querySelector(".board")
const $winningMessage = document.querySelector(".winning-message")
const $winningMessageTxt = document.querySelector("#winningMessageText")
const $restartButton = document.querySelector("#restartButton")
const $cellule = document.querySelectorAll(".cell")
//toutes les manières de gagner
const WINCONDITION = [
  [1, 3, 5],
  [7, 9, 11],
  [13, 15, 17],
  [1, 7, 13],
  [3, 9, 15],
  [5, 11, 17],
  [1, 9, 17],
  [5, 9, 13]
]
//nombre de tour passé
let turnCount
//qui est en train de jouer
let whosTurn
//on a gagné ?
let victoire

//initialisation du jeu
const init = () => {
  $board.addEventListener("click", e => handleClickCase(e))
  $restartButton.addEventListener("click", e => handleClickRestart(e))
  gameStart();
}
//si click et si la case est pas remplie, on remplie la case avec la personne à qui c'est le tour, puis on voit si elle a gagné
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

//bouton restart
const handleClickRestart = (e) => {
  e.preventDefault();
  console.log("ui")
  gameStart()
}
// si l'une des conditions de victoire est atteint, on lance les feux d'artifice
const checkVictory = () => {
  WINCONDITION.forEach(e => {
    if($board.childNodes[e[0]].classList.contains(whosTurn) && $board.childNodes[e[1]].classList.contains(whosTurn) && $board.childNodes[e[2]].classList.contains(whosTurn)) {
      victoire = true
      gameOver()
    }
  });
}
//début de la partie, on remet tout bien en place si une partie à été jouée avant
const gameStart = () => {
  victoire = false
  turnCount="1"
  whosTurn = "x"
  $board.classList.add(whosTurn)
  if($board.classList.contains("circle")){
    $board.classList.remove("circle")
  } 

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

}
//la partie est finie mais est-ce une égalité ou une victoire d'un des joueurs ?
const gameOver = () => {
  $winningMessage.classList.add("show")
  if(turnCount >= 9 && !victoire) {
    $winningMessageTxt.innerHTML = `Match nul`
    return 
  }
  $winningMessageTxt.innerHTML = `${whosTurn} a gagné !`   
}

init()
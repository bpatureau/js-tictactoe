const $board = document.querySelector(".board")
const $winningMessage = document.querySelector(".winning-message")
const $winningMessageTxt = document.querySelector("#winningMessageText")
const $restartButton = document.querySelector("#restartButton")
const $cellule = document.querySelectorAll(".cell")
const $login = document.querySelector(".login")
const $startGameButton = document.querySelector(".startGameButton")
const $joueurx = document.querySelector(".joueur-x")
const $joueurcircle = document.querySelector(".joueur-circle")
const $quiJoue = document.querySelector(".quiJoue")
const $score = document.querySelector(".score")
const $scoreList = document.querySelector(".score-list")

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
//
let currentScore= []
//initialisation du jeu
const init = () => {
  if(localStorage.getItem("score" !== "")){
  currentScore = localStorage.getItem("score")
}
  $board.addEventListener("click", e => handleClickCase(e))
  $restartButton.addEventListener("click", e => handleClickRestart(e))
  $startGameButton.addEventListener("click", e => handleClickStart(e))
  gameStart();
  $login.classList.remove("hidden")
}
//si click et si la case est pas remplie, on remplie la case avec la personne à qui c'est le tour, puis on voit si elle a gagné
const handleClickCase = (e) => {
  if(e.target.classList.contains("x") || e.target.classList.contains("circle")){
    return
  }
  e.target.classList.add(whosTurn)
  $board.classList.remove(whosTurn)

  checkVictory()
// on change le joueur qui va jouer
  if(whosTurn === "x") {
    whosTurn = "circle"
  }else {
    whosTurn = "x"
  }
  $quiJoue.innerHTML = `C'est à ${localStorage.getItem(whosTurn)}`
  if(turnCount >= 9 && !victoire) {
    gameOver()
    return
  }
  turnCount++
  $board.classList.add(whosTurn)
}

//bouton start
const handleClickStart = (e) => {
  e.preventDefault();
  console.log($joueurx.value)
  if($joueurx.value === ""){
    localStorage.setItem('x', 'anonymous')
  } else {
    localStorage.setItem('x', $joueurx.value)
  }
  if($joueurcircle.value === ""){
    localStorage.setItem('circle', 'anonymous')
  } else {
    localStorage.setItem('circle', $joueurcircle.value)
  }
  gameStart()
}

//bouton Restart
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
  $login.classList.add("hidden")

  victoire = false
  turnCount="1"
  whosTurn = "x"
  $quiJoue.innerHTML= `C'est à ${localStorage.getItem(whosTurn)} `
  $board.classList.add(whosTurn)
    $board.classList.remove("circle")
    $winningMessage.classList.remove("show")

  $cellule.forEach(e => {
      e.classList.remove("x")
      e.classList.remove("circle")
  });

}
//la partie est finie mais est-ce une égalité ou une victoire d'un des joueurs ?
const gameOver = () => {
  $winningMessage.classList.add("show")
  if(turnCount >= 9 && !victoire) {
    $winningMessageTxt.innerHTML = `Match nul`
    return 
  }
  $winningMessageTxt.innerHTML = `<p>${localStorage.getItem(whosTurn)},</p> <p>le joueur des ${whosTurn}, a gagné !</p>` 
  currentScore.push(localStorage.getItem(whosTurn))
  console.log(currentScore)
  localStorage.setItem("score", currentScore)
  $scoreList.innerHTML=`<ul>${localStorage.getItem("score", currentScore)}</ul>`  
}

init()
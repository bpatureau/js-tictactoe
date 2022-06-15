//init
//déterminer à qui est le tour 
//détecter un click sur une des cases
//afficher le symbole sur la-dit case
//détecter si il y a un alignement de 3 (recherche necessaire)
//si oui, victoire pour le symbole qui à l'alignement
const $board = document.querySelector(".board")
const $winningMessage = document.querySelector(".winning-message")
const $winningMessageTxt = document.querySelector("#winningMessageText")
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
  //victoire horizontale haute
  if($board.childNodes[1].classList.contains(whosTurn) && $board.childNodes[3].classList.contains(whosTurn) && $board.childNodes[5].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
    //victoire horizontale centrale
  if($board.childNodes[7].classList.contains(whosTurn) && $board.childNodes[9].classList.contains(whosTurn) && $board.childNodes[11].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
    //victoire horizontale basse
  if($board.childNodes[13].classList.contains(whosTurn) && $board.childNodes[15].classList.contains(whosTurn) && $board.childNodes[17].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
  //victoire verticale gauche
  if($board.childNodes[1].classList.contains(whosTurn) && $board.childNodes[7].classList.contains(whosTurn) && $board.childNodes[13].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
    //victoire verticale centrale
  if($board.childNodes[3].classList.contains(whosTurn) && $board.childNodes[9].classList.contains(whosTurn) && $board.childNodes[15].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
    //victoire verticale droite
  if($board.childNodes[5].classList.contains(whosTurn) && $board.childNodes[11].classList.contains(whosTurn) && $board.childNodes[17].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
  //victoire diagonale gauche-droite
  if($board.childNodes[1].classList.contains(whosTurn) && $board.childNodes[9].classList.contains(whosTurn) && $board.childNodes[17].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
  //victoire diagonale droite-gauche
  if($board.childNodes[5].classList.contains(whosTurn) && $board.childNodes[9].classList.contains(whosTurn) && $board.childNodes[13].classList.contains(whosTurn)) {
    victoire = true
    gameOver()
    return
  }
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
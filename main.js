//init
//déterminer à qui est le tour 
//détecter un click sur une des cases
//afficher le symbole sur la-dit case
//détecter si il y a un alignement de 3 (recherche necessaire)
//si oui, victoire pour le symbole qui à l'alignement
const $board = document.querySelector(".board")
let whosTurn = ""
const init = () => {
  $board.addEventListener("click", e => handleClick(e))
  gameStart();
}

const handleClick = (e) => {
  e.target.classList.add(whosTurn)
  $board.classList.remove(whosTurn)
  if(whosTurn === "x") {
    whosTurn = "circle"
    console.log(whosTurn)
  }else {
    whosTurn = "x"
    console.log(whosTurn)
  }
  $board.classList.add(whosTurn)
}

const gameStart = () => {
  whosTurn = "x"
  $board.classList.add(whosTurn)
}

const gameWon = () => {

}

init()
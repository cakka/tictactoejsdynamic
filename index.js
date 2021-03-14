/**
 * Javascript for Tic Tac Toe Game
 * Developed by Cakkavati Kusuma
 */

let activeGame = true;

let currentPlayer = "X";

var colNumber = prompt('Number of columns ?'); //number of columns
var colSize = parseInt(colNumber);

let gameState = [];
let firstPlayerState = [];
let secondPlayerState = [];

const playerTurn = () => `${currentPlayer} turn`;
const winMsg = () => `${currentPlayer} is won`;
const drawMsg = () => `Game is draw`;

let playingStatus = document.querySelector(".playing-status");

function setGameState(colSize){
    let totalCol = colSize * colSize;

    for (let idx = 0; idx < totalCol; idx++) {
        gameState.push("");
    }
}

function drawGameArea(colSize){
    let colIdx = 0;
    for (let idxParent = 0; idxParent < colSize; idxParent++) {
        var row = document.createElement('tr');

        for (let idxChild = 0; idxChild < colSize; idxChild++) {
            var newCol = document.createElement('td');
            newCol.setAttribute('col-idx', colIdx);
            newCol.classList.add("col");

            newCol.addEventListener('click', cellClickHandler);
            row.appendChild(newCol);

            colIdx++;
        }
        $("#board-game").append(row);
    }
}

function turnPlayer(){
    playingStatus.innerHTML = playerTurn();    
}

function cellPlayedHandler(cell, idx){
    // Change to O or X
    gameState[idx] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

function changePlayer(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    turnPlayer();
}

function checkWinner(){
    var winner = "";

    // Horizontal check
    for (let i = 0; i < colSize; i++) {
        let winState = true;
        let preVal = "";  // previous value
        let colPosition = i * colSize;
        let totalColPerRow = 0;

        for (let idxRow = 0; idxRow < colSize; idxRow++) {
            if(idxRow == 0){
                preVal = gameState[colPosition];
            } else {
                if(idxRow > 0){
                    if(preVal == ""){
                        continue;
                    }
                }

                if(preVal != gameState[colPosition]){
                    winState = false;
                    continue;
                }
            }

            totalColPerRow = idxRow + 1;
            if(totalColPerRow == colSize){
                if(winState == true){
                    winner = gameState[colPosition];
                    break;
                }
            }

            colPosition++;
        }
    }
    

    // Vertical Check
    for (let i = 0; i < colSize; i++) {
        let winState = true;
        let preVal = "";  // previous value
        let colPosition = i;
        let totalColPerRow = 0;

        for (let idxRow = 0; idxRow < colSize; idxRow++) {
            if(idxRow == 0){
                preVal = gameState[i];
            } else {
                if(idxRow > 0){
                    if(preVal == ""){
                        continue;
                    }
                }

                colPosition += colSize;

                if(preVal != gameState[colPosition]){
                    winState = false;
                    continue;
                }
            }

            totalColPerRow = idxRow + 1;
            if(totalColPerRow == colSize){
                if(winState == true){
                    winner = gameState[colPosition];
                    break;
                }
            }
        }
    }

    // Vertical Check (L to R)
    let diagonalCounterLR = 1 + colSize;
    let winStateDLR = true;
    let colPositionDLR = diagonalCounterLR;
    let totalColPerRowDLR = 0;
    let preValDLR = "";  // previous value
    for (let i = 0; i < colSize; i++) {
        if(i == 0 ){
            preValDLR = gameState[i];
        } else {
            if(preValDLR == ""){
                break;
            }

            if(preValDLR != gameState[colPositionDLR]){
                winStateDLR = false;
                break;
            }

            colPositionDLR += diagonalCounterLR;
        }

        totalColPerRowDLR = i + 1;
        if(totalColPerRowDLR == colSize){
            if(winStateDLR == true){
                winner = gameState[colPositionDLR];
            }
        }
    }

    // Vertical Check (R to L)
    let diagonalCounterRL = (colSize - 1);
    let winStateDRL = true;
    let colPositionDRL = diagonalCounterRL;
    let totalColPerRowDRL = 0;
    let preValDRL = "";  // previous value
    for (let i = 0; i < colSize; i++) {
        if(i == 0 ){
            preValDRL = gameState[diagonalCounterRL];
        } else {
            if(preValDRL == ""){
                break;
            }

            if(preValDRL != gameState[colPositionDRL]){
                winStateDRL = false;
                break;
            }

            colPositionDRL += diagonalCounterRL;
        }

        totalColPerRowDRL = i + 1;
        if(totalColPerRowDRL == colSize){
            if(winStateDRL == true){
                winner = gameState[colPositionDRL];
            }
        }
    }

    if(winner != ""){
        activeGame = false;
        playingStatus.innerHTML = winMsg();
        return;
    } else {
        // Draw 
        let totalCol = colSize * colSize;
        let validatorBoard = 0;
        for (let i = 0; i < totalCol; i++) {
            if(gameState[i] != ""){
                validatorBoard += 1;
            }
        }

        if(validatorBoard == totalCol){
            activeGame = false;
            playingStatus.innerHTML = drawMsg();
            return;
        } else {
            changePlayer();
        }
    }
}

// Get cell info
function cellClickHandler(event) {
    if(!activeGame){
        return;
    }

    const cellSelected = event.target;

    const cellSelectedIndex = Number(
        cellSelected.getAttribute('col-idx')
    );

    cellPlayedHandler(cellSelected, cellSelectedIndex);
    checkWinner();
}

// Restart game state
function restartGame() {
    activeGame = true;
    currentPlayer = "X";
    gameState = [];

    // reset cells
    const boardGame = document.getElementById("board-game");
    boardGame.innerHTML = '';

    // reset all cell
    // document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

    drawGameArea(colSize);
    setGameState(colSize);

    turnPlayer();
}


window.addEventListener('load', (event) => {
    drawGameArea(colSize);
    setGameState(colSize);
  });
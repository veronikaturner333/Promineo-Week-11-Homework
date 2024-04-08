const cells= document.querySelectorAll(".cell"); //obtain nodelist of all elements with cell class
const statusText = document.querySelector("#statusText"); //returning statusText element by id
const restartBtn = document.querySelector("#restartBtn"); //returning restartBtn element by id
//winConditions is 2D array of indices, all the winning plays
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//starting out array of empty strings for each cell
let options = ["", "", "", "", "", "", "", "", "", ];
//keep track of current player
let currentPlayer = "🐟";
//switches to true when game is initialized
let running = false;
//hide winner button until the end of the game
winner.hidden=true;

startGame();

function startGame(){
    //event listeners
    //executing callback cellClicked function once for each array element
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    //invoke restart game function when clicked
    restartBtn.addEventListener("click", restartGame);
    //use template literal to display which player's turn it is
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true; //when we initialize game, running is set to true
}

function cellClicked(){
    //this refers to whatever cell we click on
    //we get the index of that cell
    const cellIndex = this.getAttribute("cellIndex");
    //check that cell is not empty or game isn't running
    if(options[cellIndex] != "" || !running){
        return;
    }
    //otherwise invoke functions to update cell content and check winner
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer; //updating current placeholders
    cell.textContent = currentPlayer;
}

function switchPlayer(){
    //reassigning current player after each turn.
    //If current player is fish, display that it's their turn (and vice versa)
    currentPlayer = (currentPlayer == "🐟") ? "🐭" : "🐟";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    //start with roundWon as false
    let roundWon = false;

    //iterate through each inner array (that is stored in a temp variable)
    //iterate until win conditions are met
    //if there are no spaces and indices are all the same, somebody won
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        //we continue as long as there are empty spaces
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //if cell A B and C are the same we have a winner
        if(cellA == cellB && cellB == cellC){
            //set our local variable equal to true
            roundWon = true;
            break; //we don't need to continue the for loop when there is a winner
        }
    }

    if(roundWon){
        //use template literal to display winner
        //hide status text and show winner button
        winner.hidden=false;
        winner.textContent = `${currentPlayer} wins!`;
        statusText.hidden= true;
        //game is over
        running = false;
    }
    //if there are no spaces left but winnning conditions aren't met, it's a draw
    //unhide winner button and hide status text
    else if(!options.includes("")){
        winner.hidden=false;
        winner.textContent = `Draw!`;
        statusText.hidden= true;
        running = false;
    }
    //else change player and keep playing
    else{
        switchPlayer();
    }
}

//clear board and restart game when we click restart
//running is set back to true
//hide winner button and show status text
function restartGame(){
    currentPlayer = "🐟";
    options = ["", "", "", "", "", "", "", "", "", ];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    winner.hidden=true;
    statusText.hidden=false;
}
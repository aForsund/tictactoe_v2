
const gridElement = document.querySelector('.grid');
const closeElement = document.querySelector('#closeAbout');
const startElement = document.querySelector('.start');

//Selectable list of player options
const playerOptions = ['human', "cpuEasy", "cpuHard"];

//Assign X and O
const playerMarks = ['X','O'];

let playerOne = {
    player: playerOptions[0],
    turn: true,
    mark: 'X',
    score: 0,
    wins: 0,
    winStreak: 0

}

let playerTwo = {
    player: playerOptions[1],
    turn: false,
    mark: 'O',
    score: 0,
    wins: 0,
    winStreak: 0
}


//assign variable to each grid element
/*
const row1col1 = document.querySelector("#row1col1");
const row1col2 = document.querySelector("#row1col2");
const row1col3 = document.querySelector("#row1col3");
const row2col1 = document.querySelector("#row2col1");
const row2col2 = document.querySelector("#row2col2");
const row2col3 = document.querySelector("#row2col3");
const row3col1 = document.querySelector("#row3col1");
const row3col2 = document.querySelector("#row3col2");
const row3col3 = document.querySelector("#row3col3");
*/

const gridReference = [
    ['row1col1','row1col2','row1col3'],
    ['row2col1','row2col2','row2col3'],
    ['row3col1','row3col2','row3col3']
];

/*
 1- add local storage to determine turn
 2 - add history of moves to empty array
 */

const Game = () => {
    
    
    let turnCount = 0;


    //Logic to save playerTurn variable to local storage


    //Logic to save array of turn events to local storage
    const saveTurn = (turn) => {
        console.log("saveTurn()");
        let turnEvents;
        //check if turnEvents exists in local storage
        if (localStorage.getItem('turnEvents') === null) turnEvents = [];
        else turnEvents = JSON.parse(localStorage.getItem("turnEvents"));
        
        turnEvents.push(turn);
        localStorage.setItem('turnEvents', JSON.stringify(turnEvents));
    }

    

    //Logic to alternate turns between player one and player two
    const newTurn = () => {
        
        console.log("saving turn...");
        saveTurn();
        
        console.log("newTurn()");

        if ((playerOne.turn) && (!playerTwo.turn)) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else if ((!playerOne.turn) && (playerTwo.turn)){
            playerOne.turn = true;
            playerTwo.turn = false;
        } else {
            console.log("player turns are not correct!");
        }
        turnCount++;
        //Automatically continue game if game is not completed.
        nextIteration();
        console.log(turnCount);
    }

    

    //Determine who's turn it is
    const getCurrentPlayer = () => {
        console.log("getCurrentPlayer()");
        if (playerOne.turn) return playerOne;
        else return playerTwo;
        
    }

    //Logic to Initiate a clean board
    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    //Draw board based on content of board array
    const drawBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++){
                console.log("drawBoard()");
                
                let gridElement = document.querySelector("#"+`${gridReference[i][j]}`);
                
                gridElement.innerText = board[i][j];
                
                
            }
        }
    }
    
    //Update location on board with passed element
    const updateBoard = (location, element) => {
        console.log("updateBoard()");
        document.querySelector("#"+`${location}`).innerText = element;
    }
   
    //Assign events on mouse click
  
    //Continue game when user clicks board
    gridElement.addEventListener('click', function(event) {
        console.log("eventListener('click')");
        

        if (confirmInput()) {
            addMark(event.target.id, getElement());
            newTurn();
        }
        
        
    });
    
    //checks if click input is valid (if it is a player's turn)
    const confirmInput = () => {
        if (((playerOne.player === 'human') && playerOne.turn) || ((playerTwo.player === 'human') && playerTwo.turn)) {
            return true;
        } else return false;
           
    }

    //Logic to keep iterating through game
    const nextIteration = () => {
        if (checkWinner(getCurrentPlayer())) {
            return;
        }

        console.log("nextIteration()");
        if (!checkComplete()) {
            alert("Game has ended");
            return;
        }

        //check if one of the players is human and has turn - then perform logic to progress game
        if(confirmInput()) {
            console.log("waiting for human input");
            return;
       
        }
        //continue iteration until game is complete
        else {
            console.log("nextIteration() if not human");
            computerTurn();
        }
    }

    
    
    //Computer logic to place mark on board
    const computerTurn = () => {
        console.log('Hi I am a Computer, this is my turn');
        computerChoice();
        
        newTurn();
        
    }
    
    //Dummy algorithm for computer to make a random choice
    const computerChoice = () => {

        let i = Math.floor(Math.random() * board.length);
        let j = Math.floor(Math.random() * board[i].length);
        console.log("I'm trying to chose " + i + " and " + j);
        //check if choice is valid option
        if (checkOptions(i, j)) {
            console.log("I have chosen" + i + " and " + j + "and trying to add this to " + gridReference[i][j]);
            addMark(gridReference[i][j], getElement());
            
            return;

        } else {
            computerChoice();
        }
        
    }

    //check if more options are avaliable
    const checkComplete = () => {
        if (turnCount <= 8) return true;
        return false;
    }


    const getElement = () => {
        if (getCurrentPlayer() === playerOne) return playerOne.mark;
        else return playerTwo.mark;
    }

   
    const addMark = (location, element) => {
        
        setArrayElement(location, element);
        updateBoard(location, element);
        
        //drawBoard();
        //`${location}`.innerText = "Test";
    }


    const setArrayElement = (location, element) => {
        //iterate through array to find location of grid element
        for (let i = 0; i < gridReference.length; i++) {
            for(let j = 0; j < gridReference[i].length; j++) {
                if (location === gridReference[i][j]) {
                    board[i][j] = element;
                }
            }
        }
    }

        
    //Assign events on options change

    //Check what options are selected
    
    const checkOptions = (i, j) => {
        return board[i][j] === '';
    }

    const checkWinner = currentPlayer => {
        //logic to check if there is a winner
    
        //XXX
        //
        //
        if (board[0][0] === currentPlayer.mark && board[0][1] === currentPlayer.mark && board[0][2] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //
        //XXX
        //
        else if (board[1][0] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[1][2] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //
        //
        //XXX
        else if (board[2][0] === currentPlayer.mark && board[2][1] === currentPlayer.mark && board[2][2] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //X
        //X
        //X
        else if (board[0][0] === currentPlayer.mark && board[1][0] === currentPlayer.mark && board[2][0] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        // X
        // X
        // X
        else if (board[0][1] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[2][1] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //  X
        //  X
        //  X
        else if (board[0][2] === currentPlayer.mark && board[1][2] === currentPlayer.mark && board[2][2] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //X
        // X
        //  X
        else if (board[0][0] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[2][2] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
        //  X
        // X
        //X
        else if (board[0][2] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[2][0] === currentPlayer.mark) {
            alert(`${currentPlayer.player} has won!`);
            return true;
        }
    }



    

    //Check if computer difficulty has changed
    drawBoard();
    nextIteration();
}


Game();
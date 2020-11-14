/*
const gridElement = document.querySelector('.grid');
const closeElement = document.querySelector('#closeAbout');
const startElement = document.querySelector('.start');
*/
//Selectable list of player options

//const playerOptions = ['human', "cpuEasy", "cpuHard"];

//Assign X and O

const gridReference = [
	['row1col1', 'row1col2', 'row1col3'],
	['row2col1', 'row2col2', 'row2col3'],
	['row3col1', 'row3col2', 'row3col3'],
];

//const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];

//Receive from Vue.js instead...
//const playerMarks = ['X', 'O'];

//validate that the selected field is avaliable - return true or false
const validInput = (field, board) => {
	let [i, j] = getIndex(field);
	return board[i][j] === '';
};

//Get index of gridReference (array of i and j) when value of field is found
const getIndex = (field) => {
	for (let i = 0; i < gridReference.length; i++) {
		for (let j = 0; j < gridReference[i].length; j++) {
			if (field === gridReference[i][j]) {
				return [i, j];
			}
		}
	}
};

//check if more options are avaliable
/*
const checkComplete = () => {
    if (turnCount <= 8) return true;
    return false;
}
*/

const checkStatus = (mark, board, turnCount) => {
	//logic to check if there is a winner or there is no possible winner (draw)

	//XXX
	//
	//
	if (board[0][0] === mark && board[0][1] === mark && board[0][2] === mark) {
		return [gridReference[0][0], gridReference[0][1], gridReference[0][2]];
	}
	//
	//XXX
	//
	else if (
		board[1][0] === mark &&
		board[1][1] === mark &&
		board[1][2] === mark
	) {
		return [gridReference[1][0], gridReference[1][1], gridReference[1][2]];
	}
	//
	//
	//XXX
	else if (
		board[2][0] === mark &&
		board[2][1] === mark &&
		board[2][2] === mark
	) {
		return [gridReference[2][0], gridReference[2][1], gridReference[2][2]];
	}
	//X
	//X
	//X
	else if (
		board[0][0] === mark &&
		board[1][0] === mark &&
		board[2][0] === mark
	) {
		return [gridReference[0][0], gridReference[1][0], gridReference[2][0]];
	}
	// X
	// X
	// X
	else if (
		board[0][1] === mark &&
		board[1][1] === mark &&
		board[2][1] === mark
	) {
		return [gridReference[0][1], gridReference[1][1], gridReference[2][1]];
	}
	//  X
	//  X
	//  X
	else if (
		board[0][2] === mark &&
		board[1][2] === mark &&
		board[2][2] === mark
	) {
		return [gridReference[0][2], gridReference[1][2], gridReference[2][2]];
	}
	//X
	// X
	//  X
	else if (
		board[0][0] === mark &&
		board[1][1] === mark &&
		board[2][2] === mark
	) {
		return [gridReference[0][0], gridReference[1][1], gridReference[2][2]];
	}
	//  X
	// X
	//X
	else if (
		board[0][2] === mark &&
		board[1][1] === mark &&
		board[2][0] === mark
	) {
		return [gridReference[0][2], gridReference[1][1], gridReference[2][0]];
	}
	//return false if game can continue...
	else if (isDraw(turnCount)) {
		return 'draw';
	} else {
		return false;
	}
};

const isDraw = (turnCount) => {
	if (turnCount >= 9) return true;

	/*
    //use magic square algorithm to determine if there is a possible winner

    //first assign all empty fields to current player's mark
    let flatBoard = board.join().split(',');
    console.log('board after flatten function', board);
    flatBoard.forEach((cell, index, arr) => {
        if (cell === '') arr[index] = mark;
    }

    //then convert each valid field to magic square number
    flatBoard.forEach((cell, index, arr) => {
        if (cell === mark) arr[index] = magicSquare[index]; 
        else arr[index] = 0;
    })
    
    //then perform sum operations to determine if there is a possible win outcome for player
    */
};

/*
const getAvaliableMoves = (board) => {
    if (turnCount < 5) return 1;
    else return 1;
}
*/
const computerChoice = (difficulty, board) => {
	if (difficulty === 'medium') {
		let rng = Math.floor(Math.random() * 2);
		rng > 1 ? (difficulty = 'easy') : (difficulty = 'hard');
	}
	//Dummy algorithm for computer to make a random choice
	else if (difficulty === 'easy') {
		let conditionMet = false;
		let i = 0;
		let j = 0;
		while (!conditionMet) {
			i = Math.floor(Math.random() * board.length);
			j = Math.floor(Math.random() * board[i].length);
			console.log("I'm trying to choose " + i + ' and ' + j);

			//check if choice is valid option
			if (board[i][j] === '') {
				conditionMet = true;
			}
		}
		console.log(
			`I have chosen ${i} and ${j}, and trying to add this to gridReference[i][j]`
		);
		return [i, j];
	} else {
		console.log('minmax algorithm not yet implemented...');

		//minmax(board, player)
	}
};

export { validInput, getIndex, checkStatus, computerChoice };

/*
const minmax = (board, player, depth = 1) => {
    if (isGameOver(board))
}



//AI Helperfunction - find out how good a board is
/*
getScore() {
    let score = 0;
    if (this.playerHas3InARow('x')) {
      score -= 100;
    }
    if (this.playerHas3InARow('o')) {
      score += 100;
    }
    return score;
}  

playerHas3InARow(player) {
    // Horizontal rows
    for (let i=0; i<3; i++) {
      if (this.cells[0][i] === player && this.cells[1][i] === player && this.cells[2][i] === player) {
        return true;
      }
    }

    // Vertical rows
    for (let i=0; i<3; i++) {
      if (this.cells[i][0] === player && this.cells[i][1] === player && this.cells[i][2] === player) {
        return true;
      }
    }

    // Diagonals
    if (this.cells[0][0] === player && this.cells[1][1] === player && this.cells[2][2] === player) {
      return true;
    }
    if (this.cells[1][0] === player && this.cells[1][1] === player && this.cells[0][2] === player) {
      return true;
    }

    return false;
  }

  isGameOver() {
    return this.getPossibleMoves().length === 0 || this.playerHas3InARow('x') || this.playerHas3InARow('o');
  }

  clone() {
    let clone = new Board();

    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        clone.cells[i][j] = this.cells[i][j];
      }
    }

    return clone;
  }

  getPossibleMoves() {
    let moves = [];
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (this.cells[i][j] === '') {
          moves.push({x: i, y: j});
        }
      }
    }
    return moves;
  }
}



/*
const Game = () => {
    
    
      
    
    //iteration logic is handled in Vue.js
    //let turnCount = 0;
    
    


    //Logic to save playerTurn variable to local storage


    //Logic to save array of turn events to local storage
    //Not required in Vue.js - use state and db instead 

    
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
    //Handled by Vue.js
    
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
    
   

    


    const getElement = () => {
        if (getCurrentPlayer() === playerOne) return playerOne.mark;
        else return playerTwo.mark;
    }

    //not required in Vue.js
    
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

    



    

    //Check if computer difficulty has changed
    drawBoard();
    nextIteration();
}


Game();
*/

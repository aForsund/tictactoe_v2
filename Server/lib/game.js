module.exports = class MultiplayerGame {
  constructor({ playerOne, playerTwo, board, turnCount }) {
		let emptyBoard = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];

		this.board = board ? board : emptyBoard;

		

		this.gridReference = [
			['row1col1', 'row1col2', 'row1col3'],
			['row2col1', 'row2col2', 'row2col3'],
			['row3col1', 'row3col2', 'row3col3'],
		];

		this.magicSquare = [
			[2, 7, 6],
			[9, 5, 1],
			[4, 3, 8],
		];

		this.playerOne = playerOne;
		this.playerTwo = playerTwo;

		//set current player turn
    this.currentPlayer = this.playerOne.turn ? this.playerOne : this.playerTwo;
    
    this.history = [];

		this.currentMove = null;

		//Boolean to prevent multiple inputs from user
		this.spamControl = false;


		this.possibleMoves = [];

		
		

		this.status = {
			turnCount: turnCount ? turnCount : 1,
			isEnded: false,
			draw: false,
			winCondition: [],
			statusText: '',
			loading: false,
			showLoading: false
    };
  }

  getMark() {
		return this.currentPlayer === this.playerOne
			? this.playerOne.mark
			: this.playerTwo.mark;
	}

	getNextMark() {
		return this.currentPlayer === this.playerOne
			? this.playerTwo.mark
			: this.playerOne.mark;
	}

	//Check status of board for current player
	checkStatus() {
		let board = this.board;
		let mark = this.getMark();
		
		//logic to check if there is a winner or there is no possible winner (draw)

		//XXX
		//
		//
		if (board[0][0] === mark && board[0][1] === mark && board[0][2] === mark) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][0],
				this.gridReference[0][1],
				this.gridReference[0][2],
			];
		}
		//
		//XXX
		//
		else if (
			board[1][0] === mark &&
			board[1][1] === mark &&
			board[1][2] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[1][0],
				this.gridReference[1][1],
				this.gridReference[1][2],
			];
		}
		//
		//
		//XXX
		else if (
			board[2][0] === mark &&
			board[2][1] === mark &&
			board[2][2] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[2][0],
				this.gridReference[2][1],
				this.gridReference[2][2],
			];
		}
		//X
		//X
		//X
		else if (
			board[0][0] === mark &&
			board[1][0] === mark &&
			board[2][0] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][0],
				this.gridReference[1][0],
				this.gridReference[2][0],
			];
		}
		// X
		// X
		// X
		else if (
			board[0][1] === mark &&
			board[1][1] === mark &&
			board[2][1] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][1],
				this.gridReference[1][1],
				this.gridReference[2][1],
			];
		}
		//  X
		//  X
		//  X
		else if (
			board[0][2] === mark &&
			board[1][2] === mark &&
			board[2][2] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][2],
				this.gridReference[1][2],
				this.gridReference[2][2],
			];
		}
		//X
		// X
		//  X
		else if (
			board[0][0] === mark &&
			board[1][1] === mark &&
			board[2][2] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][0],
				this.gridReference[1][1],
				this.gridReference[2][2],
			];
		}
		//  X
		// X
		//X
		else if (
			board[0][2] === mark &&
			board[1][1] === mark &&
			board[2][0] === mark
		) {
			this.status.isEnded = true;
			this.status.winCondition = [
				this.gridReference[0][2],
				this.gridReference[1][1],
				this.gridReference[2][0],
			];
		}

		//returns false if game can continue...
		else if (this.isDraw(this.getNextMark(), this.getMark(), this.status.turnCount, this.board)) {
			this.clearStatusMessage();
			this.status.isEnded = true;
			this.status.draw = true;
		} else {
			this.clearStatusMessage();
			//no action
			console.log(`Game cannot be decided on turn ${this.status.turnCount}...`);
		}
	}

	//Check if game is a draw - use after all win conditions have been checked
	isDraw(mark, nextMark, turnCount, board) {

		

		if (turnCount >= 9) return true;
		else if (turnCount === 8) {
			//check last entry only...
			return !this.checkMagicSquare(this.cloneBoard(board), mark);
		} else if (turnCount < 8 && turnCount > 4) {
			
			//get an array of all possible board combinations
			let combinations = this.getAllCombinations(board);

			//check if any possible win outcomes & return answer
			let draw = true;
			combinations.forEach(combination => {
				if (draw === false) return;
				else if (this.checkWinCondition(combination, mark) || this.checkWinCondition(combination, nextMark)) draw = false;
			})
			
			return draw;

		} else return false;
		
	}


	getAllCombinations(board) {
		let avaliableSpaces = this.getAvaliableMoves(board);

		const factorial = (n) => {
			if (n < 0) return null;
			else if (n === 0 || n === 1) return 1;
			else {
				for (let i = n - 1; i >= 1; i--) {
					n *= i;
				}
				return n;
			}
		}
		
		//Get combinations without repetition
		let possibleOutcomes = null;
		if (avaliableSpaces.length === 2) possibleOutcomes = 2;
		else possibleOutcomes = factorial(avaliableSpaces.length)/(2*(factorial(avaliableSpaces.length-2)));
		
		let results = new Array(possibleOutcomes);

		//create n * options of empty array
		for (let i = 0; i < results.length; i++) {
			results[i] = new Array(avaliableSpaces.length);
		}

		const answer = [];

		class Node {
			constructor(
				mark,
				index,
				indexArray,
				depth,
				parent = null,
				children = []
			) {
				this.mark = mark;
				this.index = index;
				this.depth = depth;
				this.indexArray = indexArray;
				this.children = children;
				this.parent = parent;

				this.generateOptions();
				this.writeOptions();
			}

			generateOptions() {
				//Create child node with avaliable options and keep track of indexes
				if (this.indexArray.length === 0) return;
				else if (this.indexArray.length === 1) {
					let newNode = new Node(
						this.mark === 'X' ? 'O' : 'X',
						this.indexArray[0],
						[],
						this.depth + 1,
						this
					);
					this.children.push(newNode);
					return;
				} else {
					

					this.indexArray.forEach((item) => {
						let rest = this.indexArray.filter((index) => index !== item);
						let newNode = new Node(
							this.mark === 'X' ? 'O' : 'X',
							item,
							rest,
							this.depth + 1,
							this
						);
						this.children.push(newNode);
					});
				}
			}
			writeOptions() {
				//Get all options and place them in the answer array according to index
				if (this.depth === avaliableSpaces.length) {
					let array = new Array(avaliableSpaces.length);
					array[this.index] = this.mark;
					answer.push(array);
					let reference = this.parent;
					let i = avaliableSpaces.length;
					do {
						array[reference.index] = reference.mark;
						reference = this.getParent(reference);

						i -= 1;
					} while (i > 1);
				}
			}
			getParent(node) {
				return node.parent;
			}
		}

		//Create a branch of nodes for each avaliable space on the board, given by the length of avaliableSpaces array
		class NodeTree {
			constructor(levels, mark) {
				this.levels = levels;
				
				this.mark = mark;
				this.children = [];
				
			}

			createMainBranches() {
				let indexArray = [];
				for (let i = 0; i < this.levels; i++) {
					indexArray.push(i);
				}
				for (let i = 0; i < this.levels; i++) {
					let rest = indexArray.filter((index) => index !== i);
					let newNode = new Node(this.mark, i, rest, 1);
					this.children.push(newNode);
				}
			}
		}

		//Helper function to filter the answer array
		const checkArray = (arr, subarr) => {
			for (let i = 0; i< arr.length; i++) {
				let checker = false;
				for (let j = 0; j < arr[i].length; j++) {
					if (arr[i][j] === subarr[j]) checker = true;
					else {
						checker = false;
						break;
					}
				}
				if (checker) return true;

			}
			return false;
		}

		const nodeTree = new NodeTree(
			avaliableSpaces.length,
			this.getNextMark()
		);
		
		//Create node tree
		nodeTree.createMainBranches();
		
		//Create and filter array to avoid duplicates
		let filteredArray = [];
		answer.forEach(item => {
			if (filteredArray.length === possibleOutcomes) return;
			else if (!checkArray(filteredArray, item)) filteredArray.push(item);
		});
			
		//Create a return array and push each possible board outcome to it
		let returnArr = []; 
		filteredArray.forEach((item) => {
			let tempArr = this.cloneBoard(board);
			for(let index = 0; index < item.length; index++) {
				let [i, j] = avaliableSpaces[index];
				tempArr[i][j] = item[index];
			}
			returnArr.push(tempArr);
		});
		
		return returnArr;
	}



	//helper function to copy board
	cloneBoard(board) {
		let cloneBoard = new Array(3);
		for (let i = 0; i < cloneBoard.length; i++) {
			cloneBoard[i] = new Array(3);
		}
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				cloneBoard[i][j] = board[i][j];
			}
		}

		return cloneBoard;
	}

	//use magic square to check if a possible win condition can be met
	checkMagicSquare(testBoard, mark) {
		
		//Convert board marks to magic square numbers
		for (let i = 0; i < testBoard.length; i++) {
			for (let j = 0; j < testBoard[i].length; j++) {
				if (testBoard[i][j] === mark || testBoard[i][j] === '')
					testBoard[i][j] = this.magicSquare[i][j];
				else testBoard[i][j] = 0;
			}
		}

		//check if sum of possible selections is 15 - ref magic square numbers
		if (testBoard[0][0] + testBoard[0][1] + testBoard[0][2] === 15) return true;
		else if (testBoard[1][0] + testBoard[1][1] + testBoard[1][2] === 15)
			return true;
		else if (testBoard[2][0] + testBoard[2][1] + testBoard[2][2] === 15)
			return true;
		else if (testBoard[0][0] + testBoard[1][0] + testBoard[2][0] === 15)
			return true;
		else if (testBoard[0][1] + testBoard[1][1] + testBoard[2][1] === 15)
			return true;
		else if (testBoard[0][2] + testBoard[1][2] + testBoard[2][2] === 15)
			return true;
		else if (testBoard[0][0] + testBoard[1][1] + testBoard[2][2] === 15)
			return true;
		else if (testBoard[2][0] + testBoard[1][1] + testBoard[0][2] === 15)
			return true;
		else return false;
	}

	checkWinCondition(board, mark) {
		let winCondition = false;
		if (board[0][0] === mark && board[0][1] === mark && board[0][2] === mark)
			winCondition = true;
		else if (
			board[1][0] === mark &&
			board[1][1] === mark &&
			board[1][2] === mark
		)
			winCondition = true;
		else if (
			board[2][0] === mark &&
			board[2][1] === mark &&
			board[2][2] === mark
		)
			winCondition = true;
		else if (
			board[0][0] === mark &&
			board[1][0] === mark &&
			board[2][0] === mark
		)
			winCondition = true;
		else if (
			board[0][1] === mark &&
			board[1][1] === mark &&
			board[2][1] === mark
		)
			winCondition = true;
		else if (
			board[0][2] === mark &&
			board[1][2] === mark &&
			board[2][2] === mark
		)
			winCondition = true;
		else if (
			board[0][0] === mark &&
			board[1][1] === mark &&
			board[2][2] === mark
		)
			winCondition = true;
		else if (
			board[0][2] === mark &&
			board[1][1] === mark &&
			board[2][0] === mark
		)
			winCondition = true;
		return winCondition;
	}

	getAvaliableMoves(board) {
		let avaliableMoves = new Array(0);
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (this.validInput(board, [i, j])) avaliableMoves.push([i, j]);
			}
		}
		return avaliableMoves;
	}

	//check if selected field is empty
	validInput(board, field) {
		let [i, j] = field;
		return board[i][j] === '';
	}

	//confirm input from human player - use boolean value to prevent multiple inputs
	async confirmInput(id) {
		
		let field = this.getIndex(id);
		

		if (
			this.validInput(this.board, field) &&
			!this.currentPlayer.cpu &&
			!this.spamControl
		) {
			this.spamControl = true;
			this.updateBoard(field);
			//await a new promise for thread to pause and update DOM..
			await new Promise(resolve => setTimeout(resolve, 0));
			this.nextIteration();
			this.computerMove();
		}
		this.spamControl = false;
  }

  //Get index of gridReference (array of i and j) when value of field (selected by player) is found
	getIndex(id) {
		for (let i = 0; i < this.gridReference.length; i++) {
			for (let j = 0; j < this.gridReference[i].length; j++) {
				if (id === this.gridReference[i][j]) {
					return [i, j];
				}
			}
		}
  }
  
  	//Update game board with array slice function (this will force Vue.js to draw updates to the array)
	updateBoard(field) {
	
		this.currentMove = field;
		let [i, j] = field;
		this.board[i].splice(j, 1, this.getMark());
  }

  	//Main function to keep track of game status and progress
	nextIteration() {
		
		//Add events to history
		this.addHistory();

		//Return if game has ended
		if (this.status.isEnded) return;

		//Update status object
		this.checkStatus();

		//Continue game if no winner or not a draw
		if (!this.status.isEnded) this.newTurn();
	}

	//Increase turn count & alternate player turns
	newTurn() {
		this.status.turnCount += 1;
		this.playerOne.turn = !this.playerOne.turn;
		this.playerTwo.turn = !this.playerTwo.turn;

		//set currentPlayer
		this.currentPlayer = this.playerOne.turn ? this.playerOne : this.playerTwo;
	}

	returnWinCondition() {
		return this.status.winCondition;
	}

	//Add turn status to history array
	addHistory() {
		this.history.push({
			turn: this.status.turnCount,
			move: this.currentMove,
			player: this.currentPlayer,
		});
	}
  
}








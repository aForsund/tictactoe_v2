export default class Game {
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

		

		this.delay = 1000;

		this.history = [];

		this.currentMove = null;

		this.spamControl = false;

		this.possibleMoves = [];

		this.status = {
			turnCount: turnCount ? turnCount : 1,
			isEnded: false,
			draw: false,
			winCondition: [],
		};

		this.minimaxStatus = {
			maxPlayer: null,
			minPlayer: null,
			startingPlayer: null
		};

		//start recursion loop to check if first (or both) players are computer players
		console.log('inside constructor, here is the board: ', this.board);
		console.log('here is the gridReference: ', this.gridReference);
		console.log('starting player is: ', this.startingPlayer);
		
		this.setStartingPlayer();
		this.computerMove();
	}
	setStartingPlayer() {
		let startingPlayer = this.currentPlayer.mark === 'X' ? 'X' : 'O';
		this.minimaxStatus.startingPlayer = startingPlayer;
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
		let nextMark = this.getNextMark();
		console.log(
			'checkStatus function - mark: ' + mark + ', nextMark: ' + nextMark
		);

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

		//return false if game can continue...
		else if (this.isDraw(this.getNextMark(), this.getMark(), this.status.turnCount, this.board)) {
			this.status.isEnded = true;
			this.status.draw = true;
		} else {
			//no action
			console.log(`Game cannot be decided on turn ${this.status.turnCount}...`);
		}
	}

	isDraw(mark, nextMark, turnCount, board) {
		//Check if game is a draw - use after all win conditions have been checked

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
		

		console.log('possible outcomes: ', possibleOutcomes);

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

		//Create a branch of nodes for each avaliable space on the board, given by the length of avaliableSpaces array.
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
					console.log(`iteration ${i}, currentIndex ${i}, rest ${rest}`);
					let newNode = new Node(this.mark, i, rest, 1);
					console.log('created new node: ', newNode);
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
		
		//Print all the nodes
		// const printAll = (node) => {
		// 	console.log('Node:', node);
		// 	if (node.children) node.children.forEach((child) => printAll(child));
		// };

		// printAll(nodeTree);
		console.log('answer:');
		console.log(answer);

		let filteredArray = [];
		answer.forEach(item => {
			if (filteredArray.length === possibleOutcomes) return;
			else if (!checkArray(filteredArray, item)) filteredArray.push(item);
		});
		console.log('filtered answer:');
		console.log(filteredArray);

		console.log('avaliableSpaces:');
		console.log(avaliableSpaces);
		
		let returnArr = [] 
		
		filteredArray.forEach((item) => {
			let tempArr = this.cloneBoard(board);
			for(let index = 0; index < item.length; index++) {
				let [i, j] = avaliableSpaces[index];
				tempArr[i][j] = item[index];
			}
			returnArr.push(tempArr);
		});
			

		console.log('returnArr:');
		console.log(returnArr);
		

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
		console.log('checkMagicSquare function...');
		console.log('mark: ', mark);
		console.log('testBoard');
		console.log(testBoard);

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
		console.log('avaliable moves: ', avaliableMoves);
		return avaliableMoves;
	}

	//check if selected field is empty
	validInput(board, field) {
		let [i, j] = field;
		return board[i][j] === '';
	}

	//confirm input from human player
	confirmInput(id) {
		
		let field = this.getIndex(id);
		

		if (
			this.validInput(this.board, field) &&
			!this.currentPlayer.cpu &&
			!this.spamControl
		) {
			this.spamControl = true;
			this.updateBoard(field);
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

	computerRandomChoice() {
		console.log("I'm making a random choice");
		//Dummy algorithm for computer to make a random choice
		let conditionMet = false;
		let i = 0;
		let j = 0;

		while (!conditionMet) {
			i = Math.floor(Math.random() * this.board.length);
			j = Math.floor(Math.random() * this.board[i].length);

			//check if choice is valid option
			if (this.validInput(this.board, [i, j])) conditionMet = true;
		}
		console.log('I have chosen ', i, ' and ', j);
		return [i, j];
	}

	computerBlockOrWin() {
		console.log('computerBlockOrWin function');
		//Check if current player has possibility to win

		let mark = this.getMark();

		//get an array with indexes of possible moves
		let avaliableMoves = this.getAvaliableMoves(this.board);

		// check if any of the choices have possible win condition - return winning choice

		let index = 0;
		while (index < avaliableMoves.length) {
			let board = new Array(0);
			console.log('board after creation with new Array(0)');
			console.log(board);
			board = this.cloneBoard(this.board);
			console.log(board);
			let [i, j] = avaliableMoves[index];
			board[i][j] = mark;
			console.log(
				'printing board from while loop in computerBlockOrWin function - checking potential win'
			);
			console.log(board);
			if (this.checkWinCondition(board, mark)) {
				console.log(
					`I have found a win condition on ${avaliableMoves[index]} and will win on this round`
				);
				return avaliableMoves[index];
			}

			index += 1;
		}
		console.log(
			'I have not found any win condtions and will now check to prevent a loss'
		);

		// check if any of the opposing choices has a win condition - return blocking choice
		let nextMark = this.getNextMark();
		index = 0;
		while (index < avaliableMoves.length) {
			let board = new Array(0);
			console.log('board after creation with new Array(0)');
			console.log(board);
			board = this.cloneBoard(this.board);
			console.log(board);
			let [i, j] = avaliableMoves[index];
			board[i][j] = nextMark;
			console.log(
				'printing board from while loop in computerBlockOrWin function - checking potential loss'
			);
			console.log(board);
			if (this.checkWinCondition(board, nextMark)) {
				console.log(
					`I have found a loss condition on ${avaliableMoves[index]} and will block this move`
				);
				return avaliableMoves[index];
			}

			index += 1;
		}

		console.log('I have not found any win or loss condition - returning false');

		return false;

	}
	createMinimaxPlayers(maxPlayer, minPlayer) {
		this.minimaxStatus.maxPlayer = maxPlayer;
		this.minimaxStatus.minPlayer = minPlayer;
	}

	//Minimax starter function for higher difficulties
	bestMove(mark, depth) {
		
		//Pruning to save calculation time on 1st choice if highest difficulty
		if (depth > 4) {
			if (this.status.turnCount === 1) {
				let options = [[0, 0], [0, 2], [2, 0], [2, 2]];
				return options[Math.floor(Math.random()*3)];
			}
			if (this.status.turnCount === 2 && this.board[1][1] === '') return [1, 1];
		}

		this.createMinimaxPlayers(mark, mark === 'X' ? 'O' : 'X');
		
		let maxEvaluation = Number.NEGATIVE_INFINITY;
		
		let avaliableMoves = this.getAvaliableMoves(this.board);
		let move = null;
		let newTurnCount = this.status.turnCount + 1;

		for (let i = 0; i < avaliableMoves.length; i++) {
			let [a, b] = avaliableMoves[i];
			let newBoard = this.cloneBoard(this.board);
			newBoard[a][b] = this.minimaxStatus.maxPlayer;
			let returnEvaluation = this.minimax(newBoard, depth, false, newTurnCount, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
			
			if(returnEvaluation > maxEvaluation) {
				maxEvaluation = returnEvaluation;
				move = [a, b];
			}
		}
		return move;

	}

	//Minimax helper function to score the board - smart draw estimation is not implemented
	getScore(board, turnCount) {

		console.log('getScore', board, turnCount);
		let ended = false;
		let score = 0;
		
		
		if (this.checkWinCondition(board, this.minimaxStatus.minPlayer)) {
			score = -1000;
			ended = true;
		}
		if (this.checkWinCondition(board, this.minimaxStatus.maxPlayer)) {
			score = 1000;
			ended = true;
		}
		
		
		if (turnCount === 9) ended = true;

		return { score, ended };
	}
	
	//Minimax algorithm - use recursion to get the optimal computer choice
	//AlphaBeta pruning implemented - will stop recursion if the current tree does not provide better options
	minimax(board, depth, maximizing, turnCount, alpha, beta) {
		console.log('minimax, ', board, depth, maximizing, turnCount);
		let status = this.getScore(board, turnCount);
		if (depth === 0 || status.ended) return status.score/turnCount;

		
		if (maximizing) {
			let maxEvaluation = Number.NEGATIVE_INFINITY;	
			let avaliableSpaces = this.getAvaliableMoves(board);
			
			let newTurnCount = turnCount + 1;
			for (let i = 0; i < avaliableSpaces.length; i++) {
				let [a, b] = avaliableSpaces[i];
				let newBoard = this.cloneBoard(board);
				newBoard[a][b] = this.minimaxStatus.maxPlayer;
				let evaluation = this.minimax(newBoard, depth - 1, false, newTurnCount, alpha, beta);
				maxEvaluation = Math.max(maxEvaluation, evaluation);
				alpha = Math.max(alpha, evaluation);
				if (beta <= alpha) break;
			}
			return maxEvaluation;
		} 
		else {
			let minEvaluation = Number.POSITIVE_INFINITY;
			let avaliableSpaces = this.getAvaliableMoves(board);
			
			let newTurnCount = turnCount + 1
			for (let i = 0; i < avaliableSpaces.length; i++) {
				let [a, b] = avaliableSpaces[i];
				let newBoard = this.cloneBoard(board);
				newBoard[a][b] = this.minimaxStatus.minPlayer;
				let evaluation = this.minimax(newBoard, depth - 1, true, newTurnCount, alpha, beta);
				minEvaluation = Math.min(minEvaluation, evaluation);
				beta = Math.min(beta, evaluation);
				if (beta <= alpha) break;
			}
			return minEvaluation;
		}
	}

	computerChoice() {
		console.log(
			"computerChoice function - I'm making a choice based on my difficulty setting, which is ",
			this.currentPlayer.difficulty
		);
		let choice = null;
		//let optimalMove = null;
		switch (this.currentPlayer.difficulty) {
			case 0:
				choice = this.computerRandomChoice();
				break;
			case 1:
				//Make a decided choice to win game or block a loss
				choice = this.computerBlockOrWin();
				//If no decided choice - make a random move
				if (!choice) choice = this.computerRandomChoice();
				break;
			case 2:
				choice = this.bestMove(this.getMark(), 2);
				break;
			case 3:
				choice = this.bestMove(this.getMark(), 10);
				//minimax(board, mark, isMaximizing, turnCount, maxDepth, depth = 1)
				//optimalMove = this.minimax(this.cloneBoard(this.board), this.getMark(), true, this.status.turnCount, 10, 1, 0);
				//choice = optimalMove.move;
				//choice = this.bestMove2(this.cloneBoard(this.board), this.getNextMark(), true, this.status.turnCount, 10);
				break;
			default:
				choice = this.computerRandomChoice();
		}
		console.log('I have chosen, ', choice);
		return choice;
	}

	async computerMove() {
		//Check conditions to exit recursion loop
		if (this.status.isEnded) return;
		if (!this.playerOne.cpu && this.playerOne.turn) return;
		if (!this.playerTwo.cpu && this.playerTwo.turn) return;

		//add delay
		console.log('before delay');
		await new Promise((resolve) => setTimeout(resolve, this.delay));
		console.log('after delay');
		//Check if any computer players have next turn and perform move
		if (
			(this.playerOne.cpu && this.playerOne.turn) ||
			(this.playerTwo.cpu && this.playerTwo.turn)
		) {
			this.updateBoard(this.computerChoice());
			this.nextIteration();
		}
		//Check if both players are controlled by computer - excecutes a recursion loop until endcondition is met
		if (this.playerOne.cpu && this.playerTwo.cpu) this.computerMove();
	}

	updateBoard(field) {
		//Update game board with array slice function (this will force Vue.js to draw updates to the array)
		this.currentMove = field;
		let [i, j] = field;
		this.board[i].splice(j, 1, this.getMark());
	}

	nextIteration() {
		console.log('nextiteration - starting player is: ', this.startingPlayer);
		//Main function to keep track of game status and progress

		//Add events to history
		this.addHistory();

		//Return if game has ended
		if (this.status.isEnded) return;

		//Update status object
		this.checkStatus();

		//Continue game if no winner or not a draw
		if (!this.status.isEnded) this.newTurn();
	}

	newTurn() {
		//Increase turn count & alternate player turns
		this.status.turnCount += 1;
		this.playerOne.turn = !this.playerOne.turn;
		this.playerTwo.turn = !this.playerTwo.turn;

		//set currentPlayer
		this.currentPlayer = this.playerOne.turn ? this.playerOne : this.playerTwo;
	}

	returnWinCondition() {
		return this.status.winCondition;
	}

	addHistory() {
		this.history.push({
			turn: this.status.turnCount,
			move: this.currentMove,
			player: this.currentPlayer,
		});
	}
}

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

		this.magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];

		this.playerOne = playerOne;
		this.playerTwo = playerTwo;

		//set current player turn
		this.currentPlayer = this.playerOne.turn ? this.playerOne : this.playerTwo;

		this.delay = 1000;

		this.history = [];

		this.currentMove = null;

		this.spamControl = false;

		this.status = {
			turnCount: turnCount ? turnCount : 1,
			isEnded: false,
			draw: false,
			winCondition: [],
		};

		//start recursion loop to check if first (or both) players are computer players
		console.log('inside constructor, here is the board: ', this.board);
		console.log('here is the gridReference: ', this.gridReference);
		this.computerMove();
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
		else if (this.isDraw(mark, nextMark)) {
			this.status.isEnded = true;
			this.status.draw = true;
		} else {
			//no action
			console.log(`Game cannot be decided on turn ${this.status.turnCount}...`);
		}
	}

	isDraw(mark, nextMark) {
		console.log('isDraw function');
		//Helper function - use after all win conditions have been checked

		if (this.status.turnCount >= 9) return true;
		else if (this.status.turnCount === 8) {
			//check last entry only...
			let flatBoard = [...this.board];
			flatBoard.join().split(',');
			console.log('board after flatten function', this.board);
			console.log('flatBoard: ', flatBoard);

			return this.checkMagicSquare(flatBoard);
		}

		//Only check if on 6th turn
		else if (this.status.turnCount > 5) {
			//use magic square algorithm to check if any possible win condition can be met for both players

			let flatBoardCurrent = [...this.board];
			flatBoardCurrent.join().split(',');
			let flatBoardNext = [...this.board];
			flatBoardNext.join().split(',');
			console.log('board after flatten function', this.board);
			console.log('flatBoard: ', flatBoardCurrent, flatBoardNext);

			//then convert each valid field to magic square number

			//then check if any possible win condition exists - return true or false
			return (
				this.checkMagicSquare(flatBoardCurrent, mark) ||
				this.checkMagicSquare(flatBoardNext, nextMark)
			);
		} else {
			//Game is not a draw
			return false;
		}
	}

	//use magic square to check if a possible win condition can be met
	checkMagicSquare(flatBoard, mark) {
		console.log('checkMAgicSquare function...');
		//Convert flat board to magic square numbers
		flatBoard.forEach((cell, index, arr) => {
			if (cell === mark || cell === '') arr[index] = this.magicSquare[index];
			else arr[index] = 0;
		});

		//check if sum of possible selections is 15 - ref magic square numbers
		if (flatBoard[0][0] + flatBoard[0][1] + flatBoard[0][2] === 15) return true;
		else if (flatBoard[1][0] + flatBoard[1][1] + flatBoard[1][2] === 15)
			return true;
		else if (flatBoard[2][0] + flatBoard[2][1] + flatBoard[2][2] === 15)
			return true;
		else if (flatBoard[0][0] + flatBoard[1][0] + flatBoard[2][0] === 15)
			return true;
		else if (flatBoard[0][1] + flatBoard[1][1] + flatBoard[2][1] === 15)
			return true;
		else if (flatBoard[0][2] + flatBoard[1][2] + flatBoard[2][2] === 15)
			return true;
		else if (flatBoard[0][0] + flatBoard[1][1] + flatBoard[2][2] === 15)
			return true;
		else if (flatBoard[0][2] + flatBoard[1][1] + flatBoard[0][2] === 15)
			return true;
		else return false;
	}

	//check if selected field is empty
	validInput(field) {
		console.log('validInput function');

		let [i, j] = field;
		console.log('i: ', i, 'j: ', j);
		return this.board[i][j] === '';
	}

	//confirm input from human player
	confirmInput(id) {
		console.log('confirmInput function, id: ', id);
		let field = this.getIndex(id);
		console.log('field: ', field);
		if (
			this.validInput(field) &&
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
		console.log('computerRandomChoice function');
		//Dummy algorithm for computer to make a random choice
		let conditionMet = false;
		let i = 0;
		let j = 0;

		while (!conditionMet) {
			i = Math.floor(Math.random() * this.board.length);
			j = Math.floor(Math.random() * this.board[i].length);

			//check if choice is valid option
			if (this.validInput([i, j])) conditionMet = true;
		}
		console.log('I have chosen ', i, ' and ', j);
		return [i, j];
	}

	computerChoice() {
		console.log('computerChoice function');
		return this.computerRandomChoice();
	}

	async computerMove() {
		console.log('computerMove function');
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
		console.log('updateBoard function');
		console.log(`write ${field} to history`);
		this.currentMove = field;
		let [i, j] = field;
		this.board[i].splice(j, 1, this.getMark());
	}

	nextIteration() {
		console.log('nextIteration');
		console.log('board:');
		console.log(this.board);
		//Main function to keep track of game status and progress

		this.addHistory();
		//Return if game has ended
		if (this.status.isEnded) return;

		//Update status object
		this.checkStatus();

		//Continue game if no winner & not a draw
		if (!this.status.isEnded) this.newTurn();
	}

	newTurn() {
		console.log('newTurn');
		//Increase turn count & alternate player turns
		this.status.turnCount += 1;
		this.playerOne.turn = !this.playerOne.turn;
		this.playerTwo.turn = !this.playerTwo.turn;

		//set currentPlayer
		this.currentPlayer = this.playerOne.turn ? this.playerOne : this.playerTwo;
	}

	returnWinCondition() {
		console.log('returnWinCondition');
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

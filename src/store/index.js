import Vue from 'vue';
import Vuex from 'vuex';
//import { Strategy } from 'passport';
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		searchArray: [],
		setCount: 0,
		ticTacToeGame: {
			isActive: false,
			playerOne: {
				player: 'human',
				turn: true,
				score: 0,
			},
			playerTwo: {
				player: 'cpuEasy',
				turn: false,
				score: 0,
			},
			board: [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			],
			turnCount: 1,
			roundCount: 0,
			highlightedCells: [],
			winner: '',
			isEnded: false,
		},
	},
	mutations: {
		updatePlayerOne(state, option) {
			state.ticTacToeGame.playerOne.player = option;
		},
		updatePlayerTwo(state, option) {
			state.ticTacToeGame.playerTwo.player = option;
		},
		rememberSearchResults(state, arr) {
			state.searchArray = arr;
		},
		updateBoard(state, board) {
			state.ticTacToeGame.board = board;
		},
		resetGame(state) {
			state.ticTacToeGame.board = [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			];
			state.ticTacToeGame.winner = '';
			state.ticTacToeGame.turnCount = 1;
			state.ticTacToeGame.highlightedCells = [];
			state.ticTacToeGame.playerOne.turn = true;
			state.ticTacToeGame.playerTwo.turn = false;
			state.ticTacToeGame.isEnded = false;
			state.ticTacToeGame.roundCount = 0;
			state.ticTacToeGame.playerOne.score = 0;
			state.ticTacToeGame.playerTwo.score = 0;
		},
		endRound(state, result) {
			state.ticTacToeGame.playerOne.turn = false;
			state.ticTacToeGame.playerTwo.turn = false;
			state.ticTacToeGame.isEnded = true;
			console.log(`result from endround result = ${result}`);
			if (result === 'X') {
				state.ticTacToeGame.playerOne.score += 1;
			} else if (result === 'O') {
				state.ticTacToeGame.playerTwo.score += 1;
			}
			console.log('p1 score: ', state.ticTacToeGame.playerOne.score);
			console.log('p2 score: ', state.ticTacToeGame.playerTwo.score);
		},
		closeGame(state) {
			state.ticTacToeGame.playerOne.score = 0;
			state.ticTacToeGame.playerTwo.score = 0;
			state.ticTacToeGame.isActive = false;
		},
		startGame(state) {
			state.ticTacToeGame.isActive = true;
		},
		newTurn(state) {
			state.ticTacToeGame.turnCount += 1;
			console.log('turncount: ', state.ticTacToeGame.turnCount);
			state.ticTacToeGame.playerOne.turn = !state.ticTacToeGame.playerOne.turn;
			state.ticTacToeGame.playerTwo.turn = !state.ticTacToeGame.playerTwo.turn;
		},
		highlightBoard(state, idArray) {
			state.ticTacToeGame.highlightedCells = idArray;
		},
		newRound(state) {
			console.log('hello from newround state');
			state.ticTacToeGame.roundCount += 1;
			state.ticTacToeGame.turnCount = 1;
			console.log(
				'turncount from newround function: ',
				state.ticTacToeGame.turnCount
			);
			state.ticTacToeGame.board = [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			];
			state.ticTacToeGame.highlightedCells = [];
			console.log(state.ticTacToeGame.roundCount);
			if (state.ticTacToeGame.roundCount % 2 === 0) {
				state.ticTacToeGame.playerOne.turn = true;
				state.ticTacToeGame.playerTwo.turn = false;
			} else {
				state.ticTacToeGame.playerOne.turn = false;
				state.ticTacToeGame.playerTwo.turn = true;
			}
			state.ticTacToeGame.isEnded = false;
		},
	},
	actions: {
		register({ data }, credentials) {
			return console.log('trying to submit: ', data, credentials);
		},
	},
	modules: {},
	getters: {},
});

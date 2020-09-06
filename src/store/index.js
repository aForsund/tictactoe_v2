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
		},
		endRound(state) {
			state.ticTacToeGame.playerOne.turn = false;
			state.ticTacToeGame.playerTwo.turn = false;
			state.ticTacToeGame.isEnded = true;
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
			state.ticTacToeGame.playerOne.turn = !state.ticTacToeGame.playerOne.turn;
			state.ticTacToeGame.playerTwo.turn = !state.ticTacToeGame.playerTwo.turn;
		},
		highlightBoard(state, idArray) {
			state.ticTacToeGame.highlightedCells = idArray;
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

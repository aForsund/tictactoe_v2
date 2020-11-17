/*eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Game from '../tictactoe.js';
import * as notification from '@/store/modules/notification.js';
import * as user from '@/store/modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		notification,
	},
	state: {
		showNav: false,
		searchArray: [],
		localGameOptions: {
			playerOne: {
				cpu: true,
				difficulty: 0,
				turn: true,
				mark: 'X',
			},
			playerTwo: {
				cpu: false,
				difficulty: 0,
				turn: false,
				mark: 'O',
			},
		},
		localGame: {
			isActive: false,
			instance: null,
			playerOneScore: 0,
			playerTwoScore: 0,
			round: 0,
		},
		history: {
			isActive: false,
			instance: null,
			result: null,
			board: null,
			step: 0,
		},
	},
	mutations: {
		CLICK_NAV(state) {
			if (state.showNav === false) state.showNav = true;
			else if (state.showNav === true) state.showNav = false;
		},
		CLICK_LINK(state) {
			state.showNav = false;
		},
		UPDATE_PLAYER_ONE(state, difficulty) {
			state.localGameOptions.playerOne.cpu !=
				state.localGameOptions.playerOne.cpu;
			if (difficulty) state.localGameOptions.playerOne.difficulty = difficulty;
		},
		UPDATE_PLAYER_TWO(state, difficulty) {
			state.localGameOptions.playerTwo.cpu !=
				state.localGameOptions.playerTwo.cpu;
			if (difficulty) state.localGameOptions.playerTwo.difficulty = difficulty;
		},
		rememberSearchResults(state, arr) {
			state.searchArray = arr;
		},
		NEW_GAME(state) {
			state.localGame.instance = new Game(state.localGameOptions);
		},
		SAVE_HISTORY(state, history) {
			state.history.instance = history;
		},
		SAVE_RESULT(state, result) {
			state.history.result = result;
		},
		SAVE_BOARD(state, board) {
			state.history.board = board;
		},
		CHANGE_STEP(state, step) {
			state.history.step = step;
		},
		CHANGE_HISTORY_BOARD(state, step) {
			state.history.board = [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			];
			for (let i = 0; i < step.turn; i++) {
				console.log('state move:');
				console.log(state.history.instance[i].move);
				console.log('state move: ');
				console.log(state.history.instance[i].player.mark);
				let [a, b] = state.history.instance[i].move;
				console.log(a, b);
				state.history.board[a][b] = state.history.instance[i].player.mark;
			}
		},

		END_ROUND(state, result) {
			state.localGameOptions.playerOne.turn = !state.localGameOptions.playerOne
				.turn;
			state.localGameOptions.playerTwo.turn = !state.localGameOptions.playerTwo
				.turn;
			state.localGame.round += 1;
			if (result === 'draw') return;
			else if (result === 'X') state.localGame.playerOneScore += 1;
			else state.localGame.playerTwoScore += 1;
		},
		RESET_GAME(state) {
			state.localGameOptions.playerOne.turn = true;
			state.localGameOptions.playerTwo.turn = false;
			state.localGame.playerOneScore = 0;
			state.localGame.playerTwoScore = 0;
		},
		CLOSE_GAME(state) {
			state.localGame.isActive = false;
		},
		START_GAME(state) {
			state.localGame.isActive = true;
		},
		VIEW_HISTORY(state) {
			state.history.isActive = true;
		},
		CLOSE_HISTORY(state) {
			state.history.isActive = false;
		},
	},

	actions: {
		register({ data }, credentials) {
			return console.log('trying to submit: ', data, credentials);
		},
	},
	
	getters: {
		loggedIn(state) {
			return !!state.user;
		}
	},
});
/*eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Game from '../../../Server/lib/tictactoe.js';

Vue.use(Vuex);

export default new Vuex.Store({
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
		},
		history: {
			board: [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			],
			turnCount: 0,
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
		UPDATE_PLAYER_ONE(state, option) {
			state.ticTacToeGame.playerOne.player = option;
		},
		UPDATE_PLAYER_TWO(state, option) {
			state.ticTacToeGame.playerTwo.player = option;
		},
		rememberSearchResults(state, arr) {
			state.searchArray = arr;
		},
		NEW_GAME(state) {
			state.localGame.instance = new Game(state.localGameOptions);
		},
		SAVE_HISTORY(state, history) {
			state.history = history;
		},
		END_ROUND(state, result) {
			if (result === 'X') state.localGame.playerOneScore += 1;
			else if (result === 'O') state.localGame.playerTwoScore += 1;
			state.localGameOptions.playerOne.turn = !state.localGameOptions.playerOne
				.turn;
			state.localGameOptions.playerTwo.turn = !state.localGameOptions.playerTwo
				.turn;
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
	},

	actions: {
		register({ data }, credentials) {
			return console.log('trying to submit: ', data, credentials);
		},
	},
	modules: {},
	getters: {},
});

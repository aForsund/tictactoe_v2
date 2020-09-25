(function(t){function e(e){for(var s,n,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)n=o[d],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&p.push(i[n][0]),i[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(s=!1)}s&&(r.splice(e--,1),t=n(n.s=a[0]))}return t}var s={},i={app:0},r=[];function n(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=s,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(a,s,function(e){return t[e]}.bind(null,s));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"094f":function(t,e,a){},"13f0":function(t,e,a){"use strict";var s=a("d4b3"),i=a.n(s);i.a},"203d":function(t,e,a){},3520:function(t,e,a){},"3a4c":function(t,e,a){"use strict";var s=a("57dd"),i=a.n(s);i.a},"49b5":function(t,e,a){"use strict";var s=a("955d"),i=a.n(s);i.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"hero is-dark is-fullheight is-bold",attrs:{id:"app"}},[a("div",{staticClass:"hero-head"},[a("NavBar")],1),a("div",{staticClass:"hero-body"},[a("router-view")],1),t._m(0)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hero-foot has-text-right"},[a("span",[a("a",{attrs:{href:"https://bulma.io"}},[a("img",{attrs:{src:"https://bulma.io/images/made-with-bulma--white.png",alt:"Made with Bulma",width:"128",height:"24"}})])])])}],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar is-dark is-unselectable",attrs:{role:"navigation","aria-label":"main navigation"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"navbar-brand"},[t._m(0),a("div",{staticClass:"navbar-burger",class:{"is-active":t.getNavStatus},attrs:{"data-target":"navMenu","aria-label":"menu","aria-expanded":"false"},on:{click:t.clickBurger}},[a("span"),a("span"),a("span")])]),a("div",{staticClass:"navbar-menu",class:{"is-active":t.getNavStatus},attrs:{id:"navMenu"}},[a("div",{staticClass:"navbar-end",on:{click:t.disableNav}},[a("router-link",{staticClass:"navbar-item",attrs:{to:{name:"about"}},on:{click:t.disableNav}},[t._v("About")]),a("router-link",{staticClass:"navbar-item",attrs:{to:{name:"game"}},on:{click:t.disableNav}},[t._v("Local Game")]),a("router-link",{staticClass:"navbar-item",attrs:{to:{name:"rankings"}},on:{click:t.disableNav}},[t._v("Rankings")]),a("span",{staticClass:"navbar-item"},[a("router-link",{staticClass:"button is-primary",attrs:{to:{name:"register"}},on:{click:t.disableNav}},[a("strong",[t._v("Register")])])],1)],1)])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"navbar-item"},[a("p",{staticClass:"has-text-weight-bold is-size-4 has-text-primary is-absolute"},[t._v("Tic Tac Toe")])])}],c={computed:{getNavStatus:function(){return this.$store.state.showNav}},data:function(){return{showNav:!1,navStatus:{burgerOpen:!1}}},methods:{clickBurger:function(){this.$store.commit("clickNav")},disableNav:function(){this.$store.commit("clickLink")}}},l=c,u=(a("d66a"),a("2877")),d=Object(u["a"])(l,n,o,!1,null,"b5efa916",null),p=d.exports,h={components:{NavBar:p}},m=h,f=(a("5c0b"),Object(u["a"])(m,i,r,!1,null,null,null)),v=f.exports,g=a("8c4f"),y=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},T=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("Tic Tac Toe")]),a("div",{staticClass:"columns is-variable is-multiline is-3"},[a("div",{staticClass:"column is-8"},[a("div",{staticClass:"notification is-dark content"},[a("h3",{staticClass:"subtitle"},[t._v("About")]),a("p",[t._v("This is a demo project of a tic tac toe game, with computer vs computer mode.")]),a("p",[t._v("This app is built with vue.js and styled with Bulma CSS framework. App is served by express with API interface and mongoDB.")]),a("p",[t._v("This project is under development and will be updated once authorization on the server API and client script is implemented. See future updates for more info.")]),a("a",{staticClass:"button is-primary",attrs:{href:"https://github.com/aForsund/tictactoe"}},[t._v("GitHub repository")])])]),a("div",{staticClass:"column is-dark is-4"},[a("div",{staticClass:"notification is-dark content"},[a("h4",{staticClass:"subtitle"},[t._v("Front end")]),a("ul",[a("li",[t._v("Vue.js and Vuex")]),a("li",[t._v("JavaScript game logic")]),a("li",[t._v("axios")]),a("li",[t._v("Bulma CSS framework")])])])]),a("div",{staticClass:"column is-4"},[a("div",{staticClass:"notification is-dark content"},[a("h4",{staticClass:"subtitle"},[t._v("Back end")]),a("ul",[a("li",[t._v("Node.js + Express")]),a("li",[t._v("Express passport and JWT*")]),a("li",[t._v("mongoDB")])]),a("p",{staticClass:"has-text-right is-size-7"},[t._v("* not yet implemented")])])]),a("div",{staticClass:"column is-8"},[a("div",{staticClass:"notification is-dark content"},[a("h3",{staticClass:"subtitle"},[t._v("Future Updates")]),a("ul",[a("li",[t._v("Login system with JWT to authenticate users")]),a("li",[t._v("Multiplayer mode with rank system")]),a("li",[t._v("Use magic square to decide if a game is a draw before the 9th mark is placed on the board, e.g draw game if no possible win condition")]),a("li",[t._v("Use minmax algorithm to select computer difficulty")])])])])])])}],b=(a("13f0"),{}),w=Object(u["a"])(b,y,T,!1,null,"5201b63a",null),C=w.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hero-body"},[a("div",{staticClass:"container has-text-centered is-unselectable game"},[t.isActive?t._e():a("div",[a("Options"),a("Start")],1),t.isActive?a("div",[a("TicTacToe")],1):t._e()])])},k=[],O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("Please select options")]),a("p",{staticClass:"mb-4 is-size-4"},[t._v("Player 1:")]),a("button",{staticClass:"opt",class:[t.defaultClass,"human"===t.options.player1?t.activeClass:""],on:{click:function(e){return t.selectPlayer1("human")}}},[t._v("Human")]),a("button",{staticClass:"opt",class:[t.defaultClass,"cpuEasy"===t.options.player1?t.activeClass:""],on:{click:function(e){return t.selectPlayer1("cpuEasy")}}},[t._v("CPU Easy")]),a("button",{staticClass:"opt",class:[t.defaultClass,"cpuHard"===t.options.player1?t.activeClass:""]},[t._v("CPU Hard")]),a("p",{staticClass:"mt-4 mb-4 is-size-4"},[t._v("Player 2:")]),a("button",{staticClass:"opt",class:[t.defaultClass,"human"===t.options.player2?t.activeClass:""],on:{click:function(e){return t.selectPlayer2("human")}}},[t._v("Human")]),a("button",{staticClass:"opt",class:[t.defaultClass,"cpuEasy"===t.options.player2?t.activeClass:""],on:{click:function(e){return t.selectPlayer2("cpuEasy")}}},[t._v("CPU Easy")]),a("button",{staticClass:"opt",class:[t.defaultClass,"cpuHard"===t.options.player2?t.activeClass:""]},[t._v("CPU Hard")]),a("p",{staticClass:"mb-4"}),a("h1",{staticClass:"title"},[t._v(t._s(t.options.player1)+" vs "+t._s(t.options.player2))]),a("p",{staticClass:"mb-4"})])},G=[],x={computed:{getPlayerOne:function(){return this.$store.state.ticTacToeGame.playerOne.player},getPlayerTwo:function(){return this.$store.state.ticTacToeGame.playerTwo.player}},data:function(){return{defaultClass:"button is-dark",activeClass:"is-primary is-active",options:{player1:"",player2:""}}},created:function(){this.options.player1=this.getPlayerOne,this.options.player2=this.getPlayerTwo},methods:{selectPlayer1:function(t){this.options.player1=t,this.$store.commit("updatePlayerOne",this.options.player1)},selectPlayer2:function(t){this.options.player2=t,this.$store.commit("updatePlayerTwo",this.options.player2)},startGame:function(){console.log("startGame selected with the following options:"),console.log(this.options)}}},P=x,$=(a("7a71"),Object(u["a"])(P,O,G,!1,null,"0b2a60b1",null)),E=$.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container has-text-centered tictactoe"},[a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"columns is-mobile"},[a("div",{staticClass:"column"},[a("div",[a("h1",{staticClass:"subtitle"},[t._v("X: "+t._s(t.getPlayerOne))]),a("h1",{staticClass:"title"},[t._v(t._s(t.getPlayerOneScore))])])]),a("div",{staticClass:"column is-narrow"},[a("div",[a("h1",{staticClass:"subtitle"},[t._v("Turn")]),a("h1",{staticClass:"title"},[t._v(t._s(t.getTurnCount))])])]),a("div",{staticClass:"column"},[a("div",[a("h1",{staticClass:"subtitle"},[t._v("O: "+t._s(t.getPlayerTwo))]),a("h1",{staticClass:"title"},[t._v(t._s(t.getPlayerTwoScore))])])])])]),a("div",{staticClass:"board"},[a("div",{staticClass:"row",attrs:{id:"row1"}},[a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row1col1")},attrs:{id:"row1col1"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[0][0]},[t._v(t._s(t.board[0][0]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row1col2")},attrs:{id:"row1col2"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[0][1]},[t._v(t._s(t.board[0][1]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row1col3")},attrs:{id:"row1col3"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[0][2]},[t._v(t._s(t.board[0][2]))])])],1)]),a("div",{staticClass:"row",attrs:{id:"row2"}},[a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row2col1")},attrs:{id:"row2col1"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[1][0]},[t._v(t._s(t.board[1][0]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row2col2")},attrs:{id:"row2col2"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[1][1]},[t._v(t._s(t.board[1][1]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row2col3")},attrs:{id:"row2col3"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[1][2]},[t._v(t._s(t.board[1][2]))])])],1)]),a("div",{staticClass:"row",attrs:{id:"row3"}},[a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row3col1")},attrs:{id:"row3col1"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[2][0]},[t._v(t._s(t.board[2][0]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row3col2")},attrs:{id:"row3col2"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[2][1]},[t._v(t._s(t.board[2][1]))])])],1),a("div",{staticClass:"cell",class:{"has-text-primary glowing":t.isHighlighted("row3col3")},attrs:{id:"row3col3"},on:{click:function(e){return t.confirmInput(e.target.id)}}},[a("transition",{attrs:{name:"fade"}},[a("span",{key:t.board[2][2]},[t._v(t._s(t.board[2][2]))])])],1)])]),a("div",{staticClass:"container has-text-centered mt-4 mb-2 status-message"},[a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"pt-1",on:{click:t.handleClick}},[a("p",{staticClass:"title"},[t.isEnded?a("span",{staticClass:"has-text-primary"},[t._v(t._s(t.statusMessage))]):t._e(),t.isEnded?t._e():a("span",[t._v("It's "+t._s(t.getTurn)+"'s turn")])]),a("p",{staticClass:"subtitle"},[t.isEnded?a("span",{staticClass:"has-text-primary"},[t._v("Press here to play again")]):t._e(),t.isEnded?t._e():a("span",[a("p",{staticClass:"mb-5"})])])])])],1),a("div",{staticClass:"container has-text-centered"},[a("button",{staticClass:"button is-info opt",on:{click:t.resetGame}},[t._v("Reset")]),a("button",{staticClass:"button is-danger opt",on:{click:t.closeGame}},[t._v("Close")])])],1)},j=[],H=(a("caad"),a("a434"),a("d3b7"),a("2532"),a("96cf"),a("1da1")),S=a("3835"),R=(a("99af"),[["row1col1","row1col2","row1col3"],["row2col1","row2col2","row2col3"],["row3col1","row3col2","row3col3"]]),A=function(t,e){var a=N(t),s=Object(S["a"])(a,2),i=s[0],r=s[1];return""===e[i][r]},N=function(t){for(var e=0;e<R.length;e++)for(var a=0;a<R[e].length;a++)if(t===R[e][a])return[e,a]},B=function(t,e,a){return e[0][0]===t&&e[0][1]===t&&e[0][2]===t?[R[0][0],R[0][1],R[0][2]]:e[1][0]===t&&e[1][1]===t&&e[1][2]===t?[R[1][0],R[1][1],R[1][2]]:e[2][0]===t&&e[2][1]===t&&e[2][2]===t?[R[2][0],R[2][1],R[2][2]]:e[0][0]===t&&e[1][0]===t&&e[2][0]===t?[R[0][0],R[1][0],R[2][0]]:e[0][1]===t&&e[1][1]===t&&e[2][1]===t?[R[0][1],R[1][1],R[2][1]]:e[0][2]===t&&e[1][2]===t&&e[2][2]===t?[R[0][2],R[1][2],R[2][2]]:e[0][0]===t&&e[1][1]===t&&e[2][2]===t?[R[0][0],R[1][1],R[2][2]]:e[0][2]===t&&e[1][1]===t&&e[2][0]===t?[R[0][2],R[1][1],R[2][0]]:!!I(a)&&"draw"},I=function(t){if(t>=9)return!0},U=function(t,e){if("medium"===t){var a=Math.floor(2*Math.random());t=a>1?"easy":"hard"}else{if("easy"===t){var s=!1,i=0,r=0;while(!s)i=Math.floor(Math.random()*e.length),r=Math.floor(Math.random()*e[i].length),console.log("I'm trying to choose "+i+" and "+r),""===e[i][r]&&(s=!0);return console.log("I have chosen ".concat(i," and ").concat(r,", and trying to add this to gridReference[i][j]")),[i,r]}console.log("minmax algorithm not yet implemented...")}},L={computed:{getBoard:function(){return this.$store.state.ticTacToeGame.board},getPlayerOne:function(){return this.$store.state.ticTacToeGame.playerOne.player},getPlayerTwo:function(){return this.$store.state.ticTacToeGame.playerTwo.player},getPlayerOneScore:function(){return this.$store.state.ticTacToeGame.playerOne.score},getPlayerTwoScore:function(){return this.$store.state.ticTacToeGame.playerTwo.score},playerOneHasTurn:function(){return this.$store.state.ticTacToeGame.playerOne.turn},playerTwoHasTurn:function(){return this.$store.state.ticTacToeGame.playerTwo.turn},getHighlightedCells:function(){return this.$store.state.ticTacToeGame.highlightedCells},isEnded:function(){return this.$store.state.ticTacToeGame.isEnded},getTurn:function(){return this.playerOneHasTurn?this.playerMarks[0]:this.playerMarks[1]},getTurnCount:function(){return this.$store.state.ticTacToeGame.turnCount}},data:function(){return{isActive:!1,board:[["","",""],["","",""],["","",""]],gridReference:[["row1col1","row1col2","row1col3"],["row2col1","row2col2","row2col3"],["row3col1","row3col2","row3col3"]],playerMarks:["X","O"],playerOneScore:0,playerTwoScore:0,statusMessage:" "}},created:function(){console.log(this.getBoard),console.log("p1: ",this.getPlayerOne),console.log("p2: ",this.getPlayerTwo),this.board=this.getBoard,this.computerMove()},watch:{},methods:{validInput:A,getIndex:N,checkStatus:B,computerChoice:U,handleClick:function(){console.log("handleClick method"),this.isEnded&&this.newRound()},newRound:function(){this.$store.commit("newRound"),this.board=this.getBoard,this.computerMove()},updateBoard:function(t,e,a){console.log("value from updateboard *******************",a,"--\x3e",t,e),this.board[t].splice(e,1,a),console.log("this.board after splice: ",this.board),this.$store.commit("updateBoard",this.board)},newTurn:function(){this.$store.commit("newTurn")},closeGame:function(){this.$store.commit("resetGame"),this.$store.commit("closeGame")},resetGame:function(){this.$store.commit("resetGame"),this.board=this.getBoard,this.computerMove()},endRound:function(t){"X"===t?(this.statusMessage="PlayerOne has won!",this.$store.commit("endRound",this.playerMarks[0])):"O"===t?(this.statusMessage="PlayerTwo has won!",this.$store.commit("endRound",this.playerMarks[1])):(this.statusMessage="It's a draw!",this.$store.commit("endRound","draw"))},highlightBoard:function(t){this.$store.commit("highlightBoard",t)},isHighlighted:function(t){return this.getHighlightedCells.includes(t)},confirmInput:function(t){if(console.log("confirm input method *******"),console.log(t,this.board),this.validInput(t,this.board))if(console.log("validinput function ok"),console.log("this get turn ",this.getTurn),console.log("this p1 has turn ",this.playerOneHasTurn),console.log("this p2 has turn ",this.playerTwoHasTurn),"human"===this.getPlayerOne&&this.playerOneHasTurn){console.log("its player 1's turn");var e=this.getIndex(t),a=Object(S["a"])(e,2),s=a[0],i=a[1];this.updateBoard(s,i,this.playerMarks[0]),this.nextIteration(),this.computerMove()}else if("human"===this.getPlayerTwo&&this.playerTwoHasTurn){console.log("its player 2's turn");var r=this.getIndex(t),n=Object(S["a"])(r,2),o=n[0],c=n[1];this.updateBoard(o,c,this.playerMarks[1]),this.nextIteration(),this.computerMove()}},nextIteration:function(){if(!this.isEnded){var t=this.checkStatus(this.getTurn===this.playerMarks[0]?this.playerMarks[0]:this.playerMarks[1],this.board,this.getTurnCount);t?"draw"===t?this.endRound():(this.highlightBoard(t),this.endRound(this.getTurn)):this.newTurn()}},computerMove:function(){var t=this;return Object(H["a"])(regeneratorRuntime.mark((function e(){var a,s,i,r,n,o,c,l,u,d,p,h,m,f,v,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("hello from computermove funciton"),!t.isEnded){e.next=3;break}return e.abrupt("return");case 3:if("human"!==t.getPlayerOne||!t.playerOneHasTurn){e.next=5;break}return e.abrupt("return");case 5:if("human"!==t.getPlayerTwo||!t.playerTwoHasTurn){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,new Promise((function(t){return setTimeout(t,1e3)}));case 9:"cpuEasy"===t.getPlayerOne&&t.playerOneHasTurn?(a=t.computerChoice("easy",t.board),s=Object(S["a"])(a,2),i=s[0],r=s[1],t.updateBoard(i,r,t.playerMarks[0]),t.nextIteration()):"cpuEasy"===t.getPlayerTwo&&t.playerTwoHasTurn?(n=t.computerChoice("easy",t.board),o=Object(S["a"])(n,2),c=o[0],l=o[1],t.updateBoard(c,l,t.playerMarks[1]),t.nextIteration()):"cpuHard"===t.getPlayerOne&&t.playerOneHasTurn?(u=t.computerChoice("hard",t.board,t.playerMarks[0]),d=Object(S["a"])(u,2),p=d[0],h=d[1],console.log("i: ",p),console.log("j: ",h),t.updateBoard(p,h,t.playerMarks[0])):"cpuHard"===t.getPlayerTwo&&t.playerTwoHasTurn&&(m=t.computerChoice("hard",t.board,t.playerMarks[1]),f=Object(S["a"])(m,2),v=f[0],g=f[1],console.log("i: ",v),console.log("j: ",g),t.updateBoard(v,g,t.playerMarks[1])),"cpuEasy"!==t.getPlayerOne&&"cpuHard"!==t.getPlayerOne||"cpuEasy"!==t.getPlayerTwo&&"cpuHard"!==t.getPlayerTwo||t.computerMove();case 11:case"end":return e.stop()}}),e)})))()}}},z=L,q=(a("e549"),Object(u["a"])(z,M,j,!1,null,"54e235a2",null)),J=q.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hero"},[a("div",{staticClass:"container"},[a("button",{staticClass:"button is-large is-info",on:{click:t.startGame}},[t._v("Start Game")])])])},X=[],F={methods:{startGame:function(){this.$store.commit("startGame")}}},V=F,W=Object(u["a"])(V,D,X,!1,null,null,null),Y=W.exports,K={computed:{isActive:function(){return this.$store.state.ticTacToeGame.isActive}},components:{Options:E,TicTacToe:J,Start:Y}},Q=K,Z=Object(u["a"])(Q,_,k,!1,null,null,null),tt=Z.exports,et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hero-body"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("Rankings")]),a("Search",{on:{"search-string":t.search}}),t._l(t.playerList,(function(t){return a("PlayerCard",{key:t._id,attrs:{player:t}})}))],2)])},at=[],st=(a("ac1f"),a("841c"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card notification is-info"},[a("div",{staticClass:"card-content"},[a("h1",{staticClass:"title"},[t._v("Player Card")]),a("p",{staticClass:"is-size-5"},[t._v(" Name: "),a("span",[t._v(t._s(t.player.username?t.player.username:t.player))])]),a("p",{staticClass:"is-size-5"},[t._v(" Games played: "),a("span",[t._v(t._s(t.player.gamesPlayed?t.player.gamesPlayed:"N/A"))])]),a("p",{staticClass:"is-size-5"},[t._v(" ELO: "),a("span",[t._v(t._s(t.player.rating?t.player.rating:"N/A"))])]),t._m(0)])])}),it=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"card-footer"},[a("button",{staticClass:"button is-link mt-2"},[t._v("Challenge")])])}],rt={props:{player:[Object,String,Array]}},nt=rt,ot=(a("58d3"),Object(u["a"])(nt,st,it,!1,null,"a619fd4e",null)),ct=ot.exports,lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card notification is-info"},[a("div",{staticClass:"card-content"},[a("div",{staticClass:"field"},[a("label",{staticClass:"label has-text-white"},[t._v("Name: "+t._s(t.test))]),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.test,expression:"test"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.test},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendRequest(e)},input:function(e){e.target.composing||(t.test=e.target.value)}}})]),a("button",{staticClass:"button is-link mt-2",on:{click:t.sendRequest}},[t._v("Search")])])])])},ut=[],dt={data:function(){return{test:""}},methods:{sendRequest:function(){this.$emit("search-string",this.test)}}},pt=dt,ht=(a("3a4c"),Object(u["a"])(pt,lt,ut,!1,null,"88ba054e",null)),mt=ht.exports,ft=(a("b0c0"),a("bc3a")),vt=a.n(ft),gt="",yt=vt.a.create({baseURL:gt,withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}}),Tt={getUsers:function(){return yt.get("/api/user")},getUser:function(t){return yt.get("/api/user/"+t)},registerUser:function(t){return yt.post("/api/auth/register",{username:t.name,email:t.email,password:t.email})},search:function(t){return yt.get("/api/user/search/"+t)}},bt={components:{PlayerCard:ct,Search:mt},computed:{searchArray:function(){return this.$store.state.searchArray}},data:function(){return{playerList:[]}},created:function(){var t=this;0===this.searchArray.length||void 0===this.searchArray?Tt.getUsers().then((function(e){return t.playerList=e.data})).catch((function(t){return console.log(t)})):this.playerList=this.searchArray},methods:{search:function(t){var e=this;return Object(H["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:console.log("searching for: ",t),console.log("store data: ",e.searchArray),""===t?Tt.getUsers().then((function(t){e.playerList=t.data,e.updateSearchArray()})).catch((function(t){return console.log(t)})):Tt.search(t).then((function(t){e.playerList=t.data,e.updateSearchArray()})).catch((function(t){return console.log(t)}));case 3:case"end":return a.stop()}}),a)})))()},updateSearchArray:function(){console.log("trying to update searchArray store with: ",this.playerList),this.$store.commit("rememberSearchResults",this.playerList)}}},wt=bt,Ct=(a("9c55"),Object(u["a"])(wt,et,at,!1,null,"3165fb7c",null)),_t=Ct.exports,kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hero-body"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("Register User")]),a("h2",{staticClass:"subtitle"},[t._v("Authorization is not yet implemented")]),a("div",{staticClass:"columns is-mobile"},[a("div",{staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third-widescreen"},[a("p",{staticClass:"subtitle"},[t._v("You can add users to the database and search for them in the rankings section")]),a("div",{staticClass:"field"},[a("p",{staticClass:"control has-icons-left has-icons-right"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"input",attrs:{type:"text",placeholder:"Username"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._m(0),""!==t.name?a("span",{staticClass:"icon is-small is-right"},[a("i",{staticClass:"fas fa-check"})]):t._e()])]),a("div",{staticClass:"field"},[a("p",{staticClass:"control has-icons-left has-icons-right"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._m(1),""!==t.password?a("span",{staticClass:"icon is-small is-right"},[a("i",{staticClass:"fas fa-check"})]):t._e()])]),a("div",{staticClass:"field"},[a("p",{staticClass:"control"},[a("button",{staticClass:"button is-success",on:{click:t.verifyRequest}},[t._v("Register")])])])])])])])},Ot=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-small is-left"},[a("i",{staticClass:"fas fa-snowboarding"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-small is-left"},[a("i",{staticClass:"fas fa-lock"})])}],Gt={data:function(){return{data:{name:"",email:"",password:""},name:"",password:"",email:""}},methods:{verifyRequest:function(){if(""===this.name&&""===this.password)return this.alertUsername(),void this.alertPassword();""!==this.name||""===this.password?""!==this.password||""===this.name?(this.data.name=this.name,this.data.password=this.password,this.register(this.data)):this.alertPassword():this.alertUsername()},clearData:function(){this.name="",this.email="",this.password="",this.data.name="",this.data.email="",this.data.password=""},alertUsername:function(){console.log("alert username...")},alertPassword:function(){console.log("alert password")},register:function(){var t=this;return Object(H["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:Tt.registerUser(t.data).then((function(e){console.log(e),t.clearData()})).catch((function(t){return console.log(t)}));case 1:case"end":return e.stop()}}),e)})))()}}},xt=Gt,Pt=(a("49b5"),Object(u["a"])(xt,kt,Ot,!1,null,"db3064d0",null)),$t=Pt.exports;s["a"].use(g["a"]);var Et=[{path:"/",component:C},{path:"/about",name:"about",component:C},{path:"/game",name:"game",component:tt},{path:"/rankings",name:"rankings",component:_t},{path:"/register",name:"register",component:$t},{path:"*",component:C}],Mt=new g["a"]({mode:"history",linkExactActiveClass:"is-active",routes:Et}),jt=Mt,Ht=a("2f62");s["a"].use(Ht["a"]);var St=new Ht["a"].Store({state:{showNav:!1,searchArray:[],setCount:0,ticTacToeGame:{isActive:!1,playerOne:{player:"human",turn:!0,score:0},playerTwo:{player:"cpuEasy",turn:!1,score:0},board:[["","",""],["","",""],["","",""]],turnCount:1,roundCount:0,highlightedCells:[],winner:"",isEnded:!1}},mutations:{clickNav:function(t){!1===t.showNav?t.showNav=!0:!0===t.showNav&&(t.showNav=!1)},clickLink:function(t){t.showNav=!1},updatePlayerOne:function(t,e){t.ticTacToeGame.playerOne.player=e},updatePlayerTwo:function(t,e){t.ticTacToeGame.playerTwo.player=e},rememberSearchResults:function(t,e){t.searchArray=e},updateBoard:function(t,e){t.ticTacToeGame.board=e},resetGame:function(t){t.ticTacToeGame.board=[["","",""],["","",""],["","",""]],t.ticTacToeGame.winner="",t.ticTacToeGame.turnCount=1,t.ticTacToeGame.highlightedCells=[],t.ticTacToeGame.playerOne.turn=!0,t.ticTacToeGame.playerTwo.turn=!1,t.ticTacToeGame.isEnded=!1,t.ticTacToeGame.roundCount=0,t.ticTacToeGame.playerOne.score=0,t.ticTacToeGame.playerTwo.score=0},endRound:function(t,e){t.ticTacToeGame.playerOne.turn=!1,t.ticTacToeGame.playerTwo.turn=!1,t.ticTacToeGame.isEnded=!0,console.log("result from endround result = ".concat(e)),"X"===e?t.ticTacToeGame.playerOne.score+=1:"O"===e&&(t.ticTacToeGame.playerTwo.score+=1),console.log("p1 score: ",t.ticTacToeGame.playerOne.score),console.log("p2 score: ",t.ticTacToeGame.playerTwo.score)},closeGame:function(t){t.ticTacToeGame.playerOne.score=0,t.ticTacToeGame.playerTwo.score=0,t.ticTacToeGame.isActive=!1},startGame:function(t){t.ticTacToeGame.isActive=!0},newTurn:function(t){t.ticTacToeGame.turnCount+=1,console.log("turncount: ",t.ticTacToeGame.turnCount),t.ticTacToeGame.playerOne.turn=!t.ticTacToeGame.playerOne.turn,t.ticTacToeGame.playerTwo.turn=!t.ticTacToeGame.playerTwo.turn},highlightBoard:function(t,e){t.ticTacToeGame.highlightedCells=e},newRound:function(t){console.log("hello from newround state"),t.ticTacToeGame.roundCount+=1,t.ticTacToeGame.turnCount=1,console.log("turncount from newround function: ",t.ticTacToeGame.turnCount),t.ticTacToeGame.board=[["","",""],["","",""],["","",""]],t.ticTacToeGame.highlightedCells=[],console.log(t.ticTacToeGame.roundCount),t.ticTacToeGame.roundCount%2===0?(t.ticTacToeGame.playerOne.turn=!0,t.ticTacToeGame.playerTwo.turn=!1):(t.ticTacToeGame.playerOne.turn=!1,t.ticTacToeGame.playerTwo.turn=!0),t.ticTacToeGame.isEnded=!1}},actions:{register:function(t,e){var a=t.data;return console.log("trying to submit: ",a,e)}},modules:{},getters:{}});s["a"].config.productionTip=!1,new s["a"]({router:jt,store:St,render:function(t){return t(v)}}).$mount("#app")},"57dd":function(t,e,a){},"58d3":function(t,e,a){"use strict";var s=a("f145"),i=a.n(s);i.a},"5c0b":function(t,e,a){"use strict";var s=a("9c0c"),i=a.n(s);i.a},"7a71":function(t,e,a){"use strict";var s=a("3520"),i=a.n(s);i.a},9155:function(t,e,a){},"955d":function(t,e,a){},"9c0c":function(t,e,a){},"9c55":function(t,e,a){"use strict";var s=a("9155"),i=a.n(s);i.a},d4b3:function(t,e,a){},d66a:function(t,e,a){"use strict";var s=a("094f"),i=a.n(s);i.a},e549:function(t,e,a){"use strict";var s=a("203d"),i=a.n(s);i.a},f145:function(t,e,a){}});
//# sourceMappingURL=app.8a8f4caa.js.map
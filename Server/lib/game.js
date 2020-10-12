/*

endRound() {
      this.historyObj.history = this.history;
      this.historyObj.outcome = this.game.status.draw
        ? "draw"
        : this.game.currentPlayer;
      this.historyObj.winCondition = this.game.status.winCondition;
      this.historyObj.board = this.game.board;
      this.$store.commit("SAVE_HISTORY", this.historyObj);
      this.$store.commit(
        "END_ROUND",
        this.game.status.draw ? "draw" : this.game.currentPlayer.mark
      );

*/

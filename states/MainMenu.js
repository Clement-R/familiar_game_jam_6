
BasicGame.MainMenu = function (game) {
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.playButton = this.add.sprite(200, 100, 'play');
		this.playButton.inputEnabled = true;
		this.playButton.events.onInputDown.add(this.startGame, this);
	},

	startGame: function () {
		this.state.start('Game');
	}

};

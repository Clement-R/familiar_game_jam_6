
BasicGame.MainMenu = function (game) {
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.playButton = this.add.sprite(200, 100, 'play');
		this.playButton.inputEnabled = true;
		this.playButton.events.onInputDown.add(this.startGame, this);

		var style = { font: "20px Arial", fill: "#ffffff"};
        this.startUIText = this.add.text(75,
                                         400,
                                         "Kill the \"no no no\" characters to prevent them to demotivate your population",
                                         style);

        var style = { font: "15px Arial", fill: "#ffffff"};
        this.otherText = this.add.text(275,
                                       530,
                                       "Click to place tower, a tower cost 150 $",
                                       style);

        this.daText = this.add.text(235,
                                    550,
                                    "Click START to launch the first wave while in game",
                                    style);

		this.music = this.add.audio('mainMenuMusic', 0.65);
		this.music.play();
	},

	startGame: function () {
		this.music.stop();
		this.state.start('Game');
	}

};

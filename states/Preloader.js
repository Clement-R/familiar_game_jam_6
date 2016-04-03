
BasicGame.Preloader = function (game) {
	this.preloadBar = null;
};

BasicGame.Preloader.prototype = {

	preload: function () {

		// Create and set preload bar
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// Sprites
		this.load.image('ground_tile', '../graphics/ground_tile.png');
		this.load.image('ground_tile_empty', '../graphics/ground_tile_empty.png');
		this.load.image('ground_aside', '../graphics/buidable_tile_aside.png');
		this.load.image('ground_corner', '../graphics/buidable_tile_corner.png');
		this.load.image('path_tile', '../graphics/path_tile.png');
		this.load.image('enemy_01', '../graphics/enemy_01-sheet.png');
		this.load.image('tower_01', '../graphics/tower_01.png');

		// Buttons
		this.load.image('play', '../graphics/play.png');

		// Music and sound
		this.load.audio('mainMenuMusic', ['../sounds/mainMenu.mp3']);
		this.load.audio('mainTheme', ['../sounds/mainTheme.mp3']);
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		// Decode MP3 files
		if (this.cache.isSoundDecoded('mainMenuMusic')) {
			this.state.start('MainMenu');
		}
	}

};

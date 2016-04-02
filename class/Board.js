Board = function (game, level) {
	// Set constants
    this.TILE_SIZE = 40;
    this.BOARD_WIDTH = 16;
    this.BOARD_HEIGHT = 12;

    this.board = [];
    this.level = level;

    this.game = game;

    this.createLevel();
};

Board.prototype.createLevel = function(first_argument) {
	for (var i = 0; i < this.BOARD_HEIGHT; i++) {
        this.board[i] = [];

        for (var j = 0; j < this.BOARD_WIDTH; j++) {
            // y : x
            switch(this.level[i][j]) {
                case 0:
                    this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE,
                                                       		i * this.TILE_SIZE,
                                                       		'ground_tile');
                    this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.game.addTower,
                                                            this.game);
                    this.board[i][j].buildable = true;
                break;

                case 1:
                    this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE,
                                                       		i * this.TILE_SIZE,
                                                       		'path_tile');
                break;
            }
        }
    }
};

Board.prototype.worldToBoard = function(x, y) {
	return {x: Math.floor(x / this.TILE_SIZE),
			y: Math.floor(y / this.TILE_SIZE)
	};
};

Board.prototype.boardToWorld = function(x, y) {
	return {x: x * this.TILE_SIZE,
			y: y * this.TILE_SIZE
	};
};
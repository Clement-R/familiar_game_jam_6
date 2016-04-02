Board = function (game, level) {
	// Set constants
    this.TILE_SIZE = 40;
    this.BOARD_WIDTH = 16;
    this.BOARD_HEIGHT = 12;

    this.board = [];
    this.logicalBoard = level;
    this.level = level;

    this.game = game;

    this.createLevel();

    this.rangeCircle = this.game.add.graphics(0, 0);
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
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                            this);
                    this.board[i][j].buildable = true;
                break;

                case 1:
                    this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE,
                                                       		i * this.TILE_SIZE,
                                                       		'path_tile');
                    this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.clearSelection,
                                                            this);
                break;
            }
        }
    }
};

Board.prototype.worldToBoard = function(x, y) {
	return {x: Math.floor(x / this.TILE_SIZE),
			y: Math.floor(y / this.TILE_SIZE)};
};

Board.prototype.boardToWorld = function(x, y) {
	return {x: x * this.TILE_SIZE,
			y: y * this.TILE_SIZE};
};

Board.prototype.addTower = function () {
    if(this.game.chosenTower !== null) {
        var mousePos = this.worldToBoard(this.game.input.mousePointer.x,
                                         this.game.input.mousePointer.y)

        if(this.isTileEmpty(mousePos.x, mousePos.y)) {
        	var spritePos = this.boardToWorld(mousePos.x, mousePos.y);

	        if(this.game.checkMoney()) {
        		this.logicalBoard[mousePos.y][mousePos.x] = 2;
	            this.game.purchaseTower();
	            this.game.towers.add(this.game.add.sprite(spritePos.x,
	                                                  	  spritePos.y,
	                                                  	  this.game.chosenTower.key)
	            );
	        } else {
	            // Not enough money to build selected tower
	        }
        }
    } else {
        console.log("No tower chosen");
    }
};

Board.prototype.isTileEmpty = function(x, y) {
	this.clearSelection();

	if(this.logicalBoard[y][x] == 0) {
		return true;
	} else if (this.logicalBoard[y][x] === 2) {
		// Select tower for upgrade
		// TODO

		// Draw range
		this.showRange(x, y);

		return false;
	} else {
		return false;
	}
};

Board.prototype.clearSelection = function() {
	this.rangeCircle.clear();
};

Board.prototype.showRange = function(x, y) {
	var spritePos = this.boardToWorld(x, y);

	this.rangeCircle.x = spritePos.x;
	this.rangeCircle.y = spritePos.y;

    this.rangeCircle.lineStyle(0);
    this.rangeCircle.beginFill(0xFFFFFF, 0.5);
    this.rangeCircle.drawCircle(this.TILE_SIZE / 2,
    							this.TILE_SIZE / 2,
    							this.game.chosenTower.range);
    this.rangeCircle.endFill();
};
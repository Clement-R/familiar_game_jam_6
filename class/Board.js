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
    var angles = [90, -90, 180];
	for (var i = 0; i < this.BOARD_HEIGHT; i++) {
        this.board[i] = [];

        for (var j = 0; j < this.BOARD_WIDTH; j++) {
            // y : x
            switch(this.level[i][j]) {
                case 0:
                	var grounds = ['ground_tile', 'ground_tile_empty'];
                	var ground = grounds[Math.floor(Math.random() * grounds.length)];

                    this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		ground);
                    this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = angles[Math.floor(Math.random() * angles.length)];
                    this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                            this);
                    this.board[i][j].buildable = true;
                break;

                case 1:
                    this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'path_tile');
                    this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = angles[Math.floor(Math.random() * angles.length)];
                    this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.clearSelection,
                                                            this);
                break;

                case 2:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_aside');
                	this.board[i][j].anchor.set(0.5, 0.5);
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                            this);
                    this.board[i][j].buildable = true;
                break;

                case 3:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_aside');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = 180;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 4:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_aside');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = 90;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 5:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_aside');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = -90;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 6:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_corner');
                	this.board[i][j].anchor.set(0.5, 0.5);
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 7:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_corner');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = -90;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 8:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_corner');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = 180;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                           this);
                    this.board[i][j].buildable = true;
                break;

                case 9:
                	this.board[i][j] = this.game.add.sprite(j * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		i * this.TILE_SIZE + (this.TILE_SIZE / 2),
                                                       		'ground_corner');
                	this.board[i][j].anchor.set(0.5, 0.5);
                    this.board[i][j].angle = 90;
                	this.board[i][j].inputEnabled = true;
                    this.board[i][j].events.onInputDown.add(this.addTower,
                                                            this);
                    this.board[i][j].buildable = true;
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
        		this.logicalBoard[mousePos.y][mousePos.x] = 1;
	            this.game.purchaseTower();

	            // Create tower, need to move this in separate class

	            var tower = this.game.add.sprite(spritePos.x + (this.TILE_SIZE / 2),
	                                 			 spritePos.y + (this.TILE_SIZE / 2),
	                                 			 this.game.chosenTower.key);
	            tower.anchor.set(0.5, 0.5);
	            tower.pivot.set(0.5, 0.5);

	            tower.aimedEnemy = null;
	            tower.price = this.game.chosenTower.price;
	            tower.range = this.game.chosenTower.range;
	            tower.damageAmount = this.game.chosenTower.damage;
	            tower.firerate = this.game.chosenTower.firerate;
	            tower.game = this.game;
	            tower.nextFire = 0;

	            tower.update = function() {
	            	if(this.aimedEnemy !== null) {
	            		if (this.game.time.time < this.nextFire) { return; }

					    this.aimedEnemy.damage(this.damageAmount);

					    this.nextFire = this.game.time.time + this.firerate;
	            	}
	            };

	            /* ******************************************************** */
	            this.game.towers.add(tower);

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

	if(this.logicalBoard[y][x] === 0 ||
	   this.logicalBoard[y][x] === 2 ||
	   this.logicalBoard[y][x] === 3 ||
	   this.logicalBoard[y][x] === 4 ||
	   this.logicalBoard[y][x] === 5 ||
	   this.logicalBoard[y][x] === 6 ||
	   this.logicalBoard[y][x] === 7 ||
	   this.logicalBoard[y][x] === 8 ||
	   this.logicalBoard[y][x] === 9 ) {
		return true;
	} else if (this.logicalBoard[y][x] === 1) {
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
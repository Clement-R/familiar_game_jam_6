Enemy = function (game, key, x, y, health, path) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.game = game;

    this.speed = 250;
    this.health = health;

    this.path = path;
    this.nextPathIndex = 0;
    this.nextPosition = path[this.nextPathIndex];

    game.add.existing(this);

    this.move();
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
};

Enemy.prototype.move = function() {
	if(this.nextPathIndex + 1 < this.path.length) {

		this.nextPathIndex ++;
		this.nextPosition = this.path[this.nextPathIndex]

		var x = this.nextPosition.x * this.game.TILE_SIZE;
		var y = this.nextPosition.y * this.game.TILE_SIZE;

		this.tween = this.game.add.tween(this);
		this.tween.to({x: x, y: y},
				 	  500 - this.speed,
		         	  Phaser.Easing.Linear.None);
		this.tween.onComplete.addOnce(this.move, this);
		this.tween.start();
	} else {
		this.destroy();
	}
};

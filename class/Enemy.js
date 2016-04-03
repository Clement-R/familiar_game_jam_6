Enemy = function (game, key, x, y, health, path, moneyValue) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.game = game;

    this.speed = 250;
    this.maxHealth = health;
    this.health = health;
    this.moneyValue = moneyValue;

    this.path = path;
    this.nextPathIndex = 0;
    this.nextPosition = path[this.nextPathIndex];

    this.healthBar = this.addHealthBar();

    game.add.existing(this);

    this.move();
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	this.healthBar.x = this.x;
	this.healthBar.y = this.y;
};

Enemy.prototype.addHealthBar = function() {
	var healthBar = this.game.add.graphics(this.x, this.y)
    healthBar.lineStyle(3, 0x00ff00, 1);
    healthBar.lineTo(this.width, 0);
    return healthBar;
};

Enemy.prototype.move = function() {
	if(this.nextPathIndex + 1 < this.path.length) {

		this.nextPathIndex ++;
		this.nextPosition = this.path[this.nextPathIndex]

		var x = this.nextPosition.x * this.game.board.TILE_SIZE;
		var y = this.nextPosition.y * this.game.board.TILE_SIZE;

		this.tween = this.game.add.tween(this);
		this.tween.to({x: x, y: y},
				 	  500 - this.speed,
		         	  Phaser.Easing.Linear.None);
		this.tween.onComplete.addOnce(this.move, this);
		this.tween.start();
	} else {
		this.healthBar.destroy();
		this.destroy();
	}
};

Enemy.prototype.damage = function(amount) {
	if (this.alive) {
        this.health -= amount;

        if(this.healthBar.scale.x >= 0 && (healthBar.scale.x - 0.00001) >= 0) {
            healthBar.scale.x -= (1 / this.maxHealth);
        }

        if (this.health <= 0) {
        	this.healthBar.destroy();
            this.destroy();
        }
    }
};

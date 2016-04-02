Enemy = function (game, key, x, y, health) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.speed = 125;

    this.health = health;
    game.add.existing(this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;


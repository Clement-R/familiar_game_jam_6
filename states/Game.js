
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        // Set stage color
        this.stage.backgroundColor = "#bdc3c7"

        // Set game variables
        this.money = 500;
        this.life = 5;

        // Start physic system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // Setup board and start-exit tiles
        this.level = [
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]
        ];

        this.start = {x: 1, y: 0};
        this.exit = {x: 13, y: 11}

        this.board = new Board(this, this.level);

        // Setup pathfinding
        this.path = null;
        var easystar = new EasyStar.js();
        easystar.setGrid(this.level);
        easystar.setAcceptableTiles([1]);
        easystar.enableSync();
        easystar.findPath(this.start.x,
                          this.start.y,
                          this.exit.x,
                          this.exit.y,
                          this.setPath.bind(this));
        easystar.calculate();

        // Set tower variables
        this.towers = this.add.group();
        this.buildableTowers = {
            tower_01: {
                name: "Simple tower",
                key: "tower_01",
                price: 150,
                range: 250,
                damage: 1,
                firerate: 500,
            },
        };
        this.chosenTower = this.buildableTowers['tower_01'];

        // Create enemy tracker
        this.enemies = this.add.group();

        // Spawn things
        this.spawnEnemy();

        // Show UI
        this.style = { font: "25px Arial", fill: "#ff0044"};
        this.moneyText = "Money : ";
        this.moneyUIText = this.add.text(0,
                                        500,
                                        this.moneyText + this.money,
                                        this.style);
        this.lifeText = "Life : ";
        this.lifeUIText = this.add.text(0,
                                        550,
                                        this.lifeText + this.life,
                                        this.style);

        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        changeKey.onDown.add(function() {
            this.spawnEnemy();
        }, this);
    },

    setPath: function(path) {
        if (path === null) {
            console.log("Path was not found.");
        } else {
            this.path = path;
        }
    },

    update: function () {
        this.checkTurretFocus();
    },

    checkTurretFocus: function() {
        this.towers.forEach(function(tower) {

            if(tower.aimedEnemy !== null && typeof tower.aimedEnemy !== "undefined") {
                tower.aimedEnemy = null;
            }

            if(tower.aimedEnemy !== null) {
                var distance = Math.sqrt(Math.pow(((tower.aimedEnemy.x + (this.board.TILE_SIZE / 2)) - tower.x), 2) + Math.pow(((tower.aimedEnemy.y + (this.board.TILE_SIZE / 2)) - tower.y), 2));
                if(distance <= (tower.range / 2)) {
                    tower.rotation = this.physics.arcade.angleToXY(tower,
                                                                   tower.aimedEnemy.x + (this.board.TILE_SIZE / 2),
                                                                   tower.aimedEnemy.y + (this.board.TILE_SIZE / 2));
                    tower.angle = tower.angle + 100;
                    return;
                } else {
                    tower.aimedEnemy = null;
                }
            }

            this.enemies.forEach(function(enemy) {
                var distance = Math.sqrt(Math.pow(((enemy.x + (this.board.TILE_SIZE / 2)) - tower.x), 2) + Math.pow(((enemy.y + (this.board.TILE_SIZE / 2)) - tower.y), 2));

                if(distance <= (tower.range / 2)) {
                    tower.rotation = this.physics.arcade.angleToXY(tower,
                                                                   enemy.x + (this.board.TILE_SIZE / 2),
                                                                   enemy.y + (this.board.TILE_SIZE / 2));
                    tower.angle = tower.angle + 100;
                    tower.aimedEnemy = enemy;
                }
            }.bind(this));

        }.bind(this));
    },

    spawnEnemy: function() {
        var enemy = new Enemy(this,
                              'enemy_01',
                              this.start.x * this.board.TILE_SIZE,
                              this.start.y * this.board.TILE_SIZE,
                              5,
                              this.path,
                              50);
        this.physics.arcade.enable(enemy);
        this.enemies.add(enemy);
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    updateUI: function() {
        this.moneyUIText.text = this.moneyText + this.money;
        this.lifeUIText.text = this.lifeText + this.life;
    },

    loseLife: function() {
        this.life --;
        this.updateUI();

        if(this.life == 0) {
            console.log("PAUSE")
            this.game.paused = true;

            this.showGameOver();
        }
    },

    checkMoney: function() {
        if(this.money - this.chosenTower.price >= 0) {
            return true;
        } else {
            return false;
        }
    },

    purchaseTower: function() {
        this.money -= this.chosenTower.price;
        this.updateUI();
    },

    showGameOver: function() {
        var style = { font: "55px Arial", fill: "#ffffff"};
        this.gameOverUIText = this.add.text(175,
                                            40,
                                            "Game over",
                                            style);

        var style2 = { font: "35px Arial", fill: "#ffffff"};
        this.gameOverUIText = this.add.text(140,
                                            120,
                                            "Press ENTER to retry",
                                            style2);

        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(function() {
            console.log("RETRY");
            this.game.paused = false;
            this.state.start('Game');
        }, this);
    }
};


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
            },
        };
        this.chosenTower = this.buildableTowers['tower_01'];

        // Create enemy tracker
        this.enemies = this.add.group();

        // Spawn things
        this.spawnEnemy();

        // Show UI
        this.moneyText = "Money : ";
        var style = { font: "25px Arial", fill: "#ff0044"};
        this.moneyUIText = this.add.text(0,
                                        500,
                                        this.moneyText + this.money,
                                        style);
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
            this.enemies.forEach(function(enemy) {
                var distance = Math.sqrt(Math.pow(((enemy.x + (this.board.TILE_SIZE / 2)) - tower.x), 2) + Math.pow(((enemy.y + (this.board.TILE_SIZE / 2)) - tower.y), 2));

                if(distance <= (tower.range / 2)) {
                    tower.rotation = this.physics.arcade.angleToXY(tower,
                                                                   enemy.x + (this.board.TILE_SIZE / 2),
                                                                   enemy.y + (this.board.TILE_SIZE / 2));
                    tower.angle = tower.angle + 100;
                }
            }.bind(this));
        }.bind(this));
    },

    spawnEnemy: function() {
        var enemy = new Enemy(this,
                              'enemy_01',
                              this.start.x * this.board.TILE_SIZE,
                              this.start.y * this.board.TILE_SIZE,
                              1,
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
    },

    checkMoney: function() {
        if(this.money - this.chosenTower.price > 0) {
            return true;
        } else {
            return false;
        }
    },

    purchaseTower: function() {
        this.money -= this.chosenTower.price;
        this.updateUI();
    },
};

/*
 * THLevel is inherits Phaser.State
 */
Phaser.THLevel = function( game, level ){
    this.game = game;
    this.levelName = level.name;
    
    this.create = function() {
        this.game.stage.backgroundColor = '#000';
        this.game.stage.fullScreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        
        this.setControls();
        this.setMap();
        this.setHero();
        
        this.game.camera.follow( this.hero );
    }
    
    this.update = function(){
        // Physics
        this.game.physics.collide(this.hero, this.ground);
        
        this.hero.THUpdate( this.keys.cursors );          
        
    }
    
    this.setMap = function(){
        this.map = this.game.add.tilemap( this.levelName );
        this.map.addTilesetImage('buildings', 'buildings');
        this.map.addTilesetImage('land', 'land');
        this.background = this.map.createLayer('background');
        this.ground = this.map.createLayer('ground');
        this.map.setCollision( this.game.config.collidableTiles, true, "ground" );
        this.background.resizeWorld();
    }
       
    this.setHero = function(){        
        this.heroInitialXY = Phaser.TetraTools.getObjectsPositionFromMap( this.map, "characters", this.game.config.hero.tileIndex )[0];
        this.hero = Phaser.THHero( this.heroInitialXY.x * this.map.tileWidth, this.heroInitialXY.y * this.map.tileHeight, this.game );            
    }
    
    this.setControls = function(){
        this.keys = {};

        this.keys.fullscreen = this.game.input.keyboard.addKey( Phaser.Keyboard.F);
        this.keys.cursors = this.game.input.keyboard.createCursorKeys(); 
        this.keys.fullscreen.onDown.add( function(){ this.game.stage.scale.startFullScreen(); }, this);      
    }
    this.render = function () {
        this.game.scaledContext.drawImage(this.game.canvas, 0, 0, this.game.config.width, this.game.config.height, 0, 0, this.game.scaledCanvas.width, this.game.scaledCanvas.height);
    }
    this.loadRender = function () {
        this.game.scaledContext.drawImage(this.game.canvas, 0, 0, this.game.config.width, this.game.config.height, 0, 0, this.game.scaledCanvas.width, this.game.scaledCanvas.height);
    }
}

Phaser.THLevel.prototype = Object.create( Phaser.State.prototype );
Phaser.THLevel.prototype.constructor = Phaser.THLevel;

/*
 * THPreloader is inherits Phaser.State
 */
Phaser.THPreloader = function( game ){
    this.game = game;
    
    this.preload = function() {
        // just shows that preloading in progress
        this.game.add.text( this.game.world.centerX, this.game.world.centerY, "Загрузка...", { fill: "#FFF" } ).anchor.setTo( 0.5, 0.5 );
        
        // load images
        this.game.load.image('buildings', 'assets/buildings.png');
        this.game.load.image('land', 'assets/land.png');
        
        // load maps
        this.game.config.levels.forEach( function( level ){
            this.game.load.tilemap( level.name, 'assets/' + level.name + '.json', null, Phaser.Tilemap.TILED_JSON);            
        }.bind( this ));
            
        // load sprites
        this.game.load.spritesheet('hero', 'assets/hero.png', 8, 8);
    }

    this.create = function() {
        // scaled canvas issues
        this.game.scaledCanvas = document.getElementById("scaledCanvas");
        this.game.scaledContext = this.game.scaledCanvas.getContext("2d");
        Phaser.Canvas.setSmoothingEnabled(this.game.scaledContext, false);
        
        this.game.state.start( game.config.levels[0].name, true, true );
    }
    this.render = function () {
        this.game.scaledContext.drawImage(this.game.canvas, 0, 0, this.game.config.width, this.game.config.height, 0, 0, this.game.scaledCanvas.width, this.game.scaledCanvas.height);
    }
}

Phaser.THPreloader.prototype = Object.create( Phaser.State.prototype );
Phaser.THPreloader.prototype.constructor = Phaser.THPreloader;



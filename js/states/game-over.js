/*
 * TetraLevelIntro is inherits Phaser.State
 */
Phaser.GameOver = function( game ){
   
    this.continue = function(){
        game.state.start( "level1", true, true );
    }
    this.create = function() {
        var style = { fill: "#FFF" };
        
        var text = game.add.text( game.config.width / 2, game.config.height / 2, "Game Over", style ).anchor.setTo( 0.5, 0.5 );
        game.camera.follow(text);
        setTimeout( function(){ this.continue() }.bind(this), 1000 )
    }
}

Phaser.GameOver.prototype = Object.create( Phaser.State.prototype );
Phaser.GameOver.prototype.constructor = Phaser.GameOver;



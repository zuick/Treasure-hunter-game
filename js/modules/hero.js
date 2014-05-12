Phaser.THHero = function( x, y, game ){

    var hero = game.add.sprite( x, y, game.config.hero.spritesheet );

    hero.init = function(){
        this.name = 'hero';

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.bounce.y = game.config.hero.bounce;
        this.body.gravity.y = game.config.hero.gravity;
        this.body.collideWorldBounds = true;
        this.body.setRectangle( 4, 8, 2, 2 );
        // todo: animations
        this.animations.add('right', [0,1], 4, true);
        this.animations.add('left', [2,3], 4, true);
        this.animations.add('up', [4,5], 4, false);
        this.animations.add('down', [6,7], 4, false);
        this.frame = 0;
    }
    
    hero.THUpdate = function( cursors ){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (cursors.left.isDown){
            this.body.velocity.x = - game.config.hero.speed;
            this.animations.play('left');
        }else if (cursors.right.isDown){
            this.body.velocity.x = game.config.hero.speed;                
            this.animations.play('right')
        }else if (cursors.up.isDown){
            this.body.velocity.y = - game.config.hero.speed;                
            this.animations.play('up')
        }else if (cursors.down.isDown){
            this.body.velocity.y = game.config.hero.speed;                
            this.animations.play('down')
        }else{
            this.animations.stop();            
        }
    }
    
    hero.init();
    
    return hero;
}

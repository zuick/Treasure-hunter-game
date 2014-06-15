Phaser.Follower = function( x, y, hero, game ){

    var follower = game.add.sprite( x, y, game.config.hero.spritesheet );

    follower.init = function(){
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
    
    follower.THUpdate = function( cursors ){
        var dist = Math.sqrt( (hero.x - this.x )*( hero.x - this.x ) + ( hero.y - this.y )*( hero.y - this.y ) );
        if(  dist > game.config.followersNear ){
            this.body.velocity.x = hero.x - this.x;
            this.body.velocity.y = hero.y - this.y;            
        }else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }         
    }
    
    follower.init();
    
    return follower;
}



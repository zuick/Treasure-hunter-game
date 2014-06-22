Phaser.Wolf = function( x, y, style, game ){

    var wolf = game.add.sprite( x, y, game.config.wolf.spritesheet );

    wolf.init = function(){
        this.name = 'wolf';
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.bounce.y = game.config.hero.bounce;
        this.body.gravity.y = game.config.hero.gravity;
        this.body.collideWorldBounds = true;
        this.body.setRectangle( 8, 7, 4, 3 );
        // todo: animations
        this.animations.add('right', [0,1], 4, true);
        this.animations.add('left', [2,3], 4, true);
        this.animations.add('up', [4,5], 4, false);
        this.animations.add('down', [6,7], 4, false);
        this.frame = 0;
        this.dir = 1;
        this.style = style;
    }
    
    wolf.onUpdate = function( cursors ){
        
        if( this.style == "up" || this.style == "down" ){
            if( this.body.velocity.y == 0){
                this.dir = -this.dir;
            }
            this.body.velocity.x = 0;
            this.body.velocity.y = this.dir * game.config.wolf.speed;           
        }else{
            if( this.body.velocity.x == 0){
                this.dir = -this.dir;
            }
            this.body.velocity.y = 0;
            this.body.velocity.x = this.dir * game.config.wolf.speed;   
        }
        
        
        if( this.body.velocity.x > Math.abs( this.body.velocity.y ) ){
            this.animations.play('right');
        }else if( -this.body.velocity.x > Math.abs( this.body.velocity.y ) ){
            this.animations.play('left');                
        }else if( this.body.velocity.y > Math.abs( this.body.velocity.x )){
            this.animations.play('down');                                
        }else if( -this.body.velocity.y > Math.abs( this.body.velocity.x ) ){
            this.animations.play('up');    
        }else{
            this.animations.stop();
        } 
    }
    
    wolf.onCollide1 = function( wolf, ground ){
        console.log( wolf );
    }
    
    wolf.init();
    
    return wolf;
}



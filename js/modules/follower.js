Phaser.Follower = function( x, y, hero, game ){

    var follower = game.add.sprite( x, y, game.config.followers.spritesheet );

    follower.init = function(){
        this.name = 'follower';

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
        
        this.heroDeltaX = hero.x - this.x;
        this.heroDeltaY = hero.y - this.y;
    }
    follower.doNothing = function(){
        
        var sideFrames = [ 0, 2 ];
        var timeout = Math.floor( 2000 + Math.random() * 8000 );
        this.animations.stop();
        this.frame = sideFrames[ Math.floor( Math.random() * 4 ) ];
        this.waiting = true;
        this.doingNothingTimeoutId = setTimeout( this.doNothing.bind( this ), timeout );
        
    }
    
    follower.onUpdate = function( cursors ){        
        
        if( this.follow ){
            var dist = this.heroDist();
            if( dist > game.config.followers.stopDist ){
                if( this.doingNothingTimeoutId ){
                    clearTimeout( this.doingNothingTimeoutId );
                    this.waiting = false;
                }
                var deltas = this.getheroDistDeltas();
                this.body.velocity.x = Math.floor( ( deltas.x ) / dist * game.config.followers.speed );
                this.body.velocity.y = Math.floor( ( deltas.y ) / dist * game.config.followers.speed );
                if( this.body.velocity.x > Math.abs( this.body.velocity.y ) ){
                    this.animations.play('right');
                }else if( -this.body.velocity.x > Math.abs( this.body.velocity.y ) ){
                    this.animations.play('left');                
                }else if( this.body.velocity.y > Math.abs( this.body.velocity.x )){
                    this.animations.play('down');                                
                }else if( -this.body.velocity.y > Math.abs( this.body.velocity.x ) ){
                    this.animations.play('up');                
                }
            }else{
                if( !this.waiting ) this.doNothing();
                this.stop();
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }else{
            if( !this.waiting ) this.doNothing();
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        
    }
    
    follower.getheroDistDeltas = function(){
        var dx = hero.x - this.x + this.heroDeltaX;
        var dy = hero.y - this.y + this.heroDeltaY;
        return { x: dx, y: dy };
    }
    
    follower.heroDist = function(){
        var deltas = this.getheroDistDeltas();
        return Math.sqrt( deltas.x * deltas.x + deltas.y * deltas.y );
    }
    
    follower.go = function(){
        if( this.heroDist() < game.config.followers.listenDist ){
            this.follow = true;                       
        }
    }
    
    follower.stop = function(){
        if( this.heroDist() < game.config.followers.listenDist ){
            this.follow = false;
            this.animations.stop();
        }
    }
    
    follower.init();
    
    return follower;
}



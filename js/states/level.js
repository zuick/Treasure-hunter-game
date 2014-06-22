/*
 * THLevel is inherits Phaser.State
 */
Phaser.THLevel = function( game, level ){
    this.game = game;
    this.levelName = level.name;
    this.dpadCursors = {
        up: { isDown: false },
        down: { isDown: false },
        left: { isDown: false },
        right: { isDown: false }
    };
    this.create = function() {
        this.game.stage.backgroundColor = '#000';
        this.game.stage.fullScreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        
        if( this.game.device.touch ){
             // Init game controller with left thumb stick
            GameController.init({
                left: {
                    type: 'dpad',
                    dpad: {
                        up: {
                            touchStart: function(){ this.dpadCursors.up.isDown = true; }.bind(this),
                            touchEnd: function(){ this.dpadCursors.up.isDown = false; }.bind(this)
                        },
                        down: {
                            touchStart: function(){ this.dpadCursors.down.isDown = true; }.bind(this),
                            touchEnd: function(){ this.dpadCursors.down.isDown = false; }.bind(this)
                        },
                        left: {
                            touchStart: function(){ this.dpadCursors.left.isDown = true; }.bind(this),
                            touchEnd: function(){ this.dpadCursors.left.isDown = false; }.bind(this)
                        },
                        right: {
                            touchStart: function(){ this.dpadCursors.right.isDown = true; }.bind(this),
                            touchEnd: function(){ this.dpadCursors.right.isDown = false; }.bind(this)
                        }
                    }
                },
                right: {
                    // We're not using anything on the right for this demo, but you can add buttons, etc.
                    // See https://github.com/austinhallock/html5-virtual-game-controller/ for examples.
                    type: 'none'
                }
            });
            
            this.touch = true;
        }
        
        this.setControls();
        this.setMap();
        this.setHero();
        this.setFollowers();
        this.setWolfs();
        this.game.camera.follow( this.hero );
    }
    
    this.update = function(){
        // Physics
        this.game.physics.collide(this.hero, this.ground);        
        this.hero.onUpdate( this.keys.cursors );    
        
        for( var i in this.followers ){
            this.game.physics.collide( this.followers[i], this.ground );
            this.followers[i].onUpdate();
        }
        
        for( var i in this.wolfs ){
            this.game.physics.collide( this.wolfs[i], this.ground );
            this.wolfs[i].onUpdate();
        }
        
        for( var i in this.followers ){
            for( var i in this.wolfs ){
                this.game.physics.collide( this.followers[i], this.wolfs[i], function(){
                    this.game.world.destroy();
                    this.game.state.start( "game-over", true, true ); 
                    
                    console.log("asd");return true; 
                
                }, null, this );
                
            }
            
        }
        
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
        this.hero = Phaser.Hero( this.heroInitialXY.x * this.map.tileWidth, this.heroInitialXY.y * this.map.tileHeight, this.game );            
    }
    
    this.setWolfs = function(){
        this.wolfs = [];
        // wolfs that goes up/down
        Phaser.TetraTools.getObjectsPositionFromMap( this.map, "characters", this.game.config.wolf.upTileIndex ).forEach( function( pos ){
            this.wolfs.push( Phaser.Wolf( pos.x * this.map.tileWidth, pos.y * this.map.tileHeight, "up", this.game ) );
        }.bind(this))
        // wolfs that goes left/right
        Phaser.TetraTools.getObjectsPositionFromMap( this.map, "characters", this.game.config.wolf.leftTileIndex ).forEach( function( pos ){
            this.wolfs.push( Phaser.Wolf( pos.x * this.map.tileWidth, pos.y * this.map.tileHeight, "left", this.game ) );
        }.bind(this))
        
    }
    
    this.setFollowers = function(){
        this.followers = [];
        for( var i = 0; i < this.game.config.followers.count; i++ ){
            var fx = this.heroInitialXY.x * this.map.tileWidth + Math.floor( ( Math.random() * this.game.config.followers.disp - this.game.config.followers.disp / 2 ) )
            var fy = this.heroInitialXY.y * this.map.tileHeight + Math.floor( ( Math.random() * this.game.config.followers.disp - this.game.config.followers.disp / 2 ) )
            this.followers.push( Phaser.Follower( fx, fy, this.hero, this.game ) )
        }
    }
    
    this.setControls = function(){
        this.keys = {};

        this.keys.fullscreen = this.game.input.keyboard.addKey( Phaser.Keyboard.F);
        this.keys.fullscreen.onDown.add( function(){ this.game.stage.scale.startFullScreen(); }, this);      
        this.keys.cursors = ( this.touch ) ? this.dpadCursors : this.game.input.keyboard.createCursorKeys(); 
        this.keys.space = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        this.keys.s = this.game.input.keyboard.addKey( Phaser.Keyboard.S );

        
        this.keys.space.onDown.add( function(){
            this.activateFollowers();
        }.bind(this));
        
        this.keys.s.onDown.add( function(){
            this.stopFollowers();
        }.bind(this));
    }
    
    this.activateFollowers = function(){
        this.followers.forEach( function( follower ){
            follower.go();
        })
    }
    
    this.stopFollowers = function(){
        this.followers.forEach( function( follower ){
            follower.stop();
        })
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

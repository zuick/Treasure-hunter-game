jQuery(document).ready( function($){
    var config = {
        width: 320,
        height: 320,
        renderer: Phaser.CANVAS,
        parent: "game",
        state: null,
        transparent: false,
        antialias: false,
        
        levels: [
            { 
                name: 'level1'
            },
        ],
        
        collidableTiles: [1,2,3,4],

        hero: {
            tileIndex: 6,
            spritesheet: 'hero',
            bounce: 0.01,
            gravity: 0,
            speed: 30,
            jump: 390,
            lives: 5,
            deathTimeout: 1000,
        },
        
        followers: {
            count: 3,
            disp: 20,
            stopDist: 10,
            listenDist: 100,
            speed: 25,
            spritesheet: 'follower',
        },
        
        wolf: {
            speed: 10,
            spritesheet: 'wolf',
            upTileIndex: 7,
            leftTileIndex: 8
        }
    }
    var aspect = window.innerWidth / window.innerHeight;
    config.height = Math.floor( config.width / aspect );
    
    
    $('<canvas>').attr({
        id: "scaledCanvas",
        width: window.innerWidth-20,
        height: window.innerHeight-20
    }).appendTo('#scaledWrapper');
    
    var game = new Phaser.Game( config );

    // add autostarting preloader state
    game.state.add( "preloader", new Phaser.THPreloader( game ), true );
    game.state.add( "game-over", new Phaser.GameOver( game ), false );
    
    // add levels to game state manager
    for( var i in config.levels ){ 
        game.state.add( config.levels[i].name, new Phaser.THLevel( game, config.levels[i] ) );
    }
})

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * osuarezqwixxduel implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * osuarezqwixxduel.js
 *
 * osuarezqwixxduel user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter"
],
function (dojo, declare) {
    return declare("bgagame.osuarezqwixxduel", ebg.core.gamegui, {
        constructor: function(){
            console.log('osuarezqwixxduel constructor');
              
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;

        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"
            
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
                case 'playerTurn':
                    console.log('playerTurn');
                    this.updateDiceValues(args.args.diceResults);
                    break;
                case 'playerTurnColor':
                    dojo.query('.dice').on('click',
                        dojo.hitch(this, 'selectDie')    
                    );
                    break;
                case 'selectingWhiteMove':
                case 'selectingColorMove':
                    // this comes from the server side
                    dojo.query('.square').on('click',
                        dojo.hitch(this, 'onPlayToken')
                    );
                    this.updatePossibleMoves(args.args.possibleMoves);
                    break;

            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
                case 'playerTurn':
                case 'playerTurnColor':
                    // clean all clicked dice between states
                    dojo.query('.dice').removeClass('dieClicked');
                    break;
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
                    case 'playerTurn':
                        this.addActionButton( 'playWhiteDice_button', _('Use'), 'onPlayWhiteDice' );
                        this.addActionButton( 'pass_button', _('Pass'), 'onPass');
                        break;
                    case 'playerTurnColor':
                        this.addActionButton( 'playColorDie_button', _('Use'), 'onPlayColorDie' );
                        this.addActionButton( 'pass_button', _('Pass'), 'onPass');
                        break;
                    case 'selectingWhiteMove':
                    case 'selectingColorMove':
                        this.addActionButton( 'selectingWhiteMove_button', _('Confirm'), 'onConfirmationPlaceToken' );
                        break;
/*                      
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */
       selectDie: function(evt)
       {
            console.log("Selected die");

            dojo.stopEvent(evt);
            
            if( !this.checkAction('playColorDie') )
            {
                return;
            }

            if(this.isCurrentPlayerActive())
            {
                if( dojo.hasClass(evt.target, 'dieClicked'))
                {
                    dojo.removeClass(evt.target, 'dieClicked');
                }
                else if (!dojo.hasClass(evt.target, 'dieClicked'))
                {
                    if(dojo.query('.dieClicked').length >=2)
                    {
                        // TODO 
                        // also check in the backend that only two dice are selected?
                        this.showMessage(_('Can not select more than two dice!'), 'info');
                    }
                    else if( dojo.hasClass(evt.target, 'white') && dojo.query('.white.dieClicked').length >= 1)
                    {
                        // two white dice selected, warning
                        this.showMessage(_('Can select only one white die!'), 'info');
                    }
                    else if( dojo.hasClass(evt.target, 'color') && dojo.query('.color.dieClicked').length >= 1 )
                    {
                        this.showMessage(_('Can select only one coloured die!'), 'info');
                    }
                    else 
                    {
                        dojo.addClass(evt.target, 'dieClicked');
                    }
                }
               
            }


            // if we are in color dice selection check that we are selecting those

            // make a permanent colour border for that die! play with CSS options here I think
            // if the die was already selected and is selected again then remove the colour border
       },


       updatePossibleMoves: function( possibleMoves )
       {
            // Remove current possible moves
            dojo.query( '.possibleMove' ).removeClass( 'possibleMove' );
            console.log('possibleMoves');
            
            var value = Object.keys(possibleMoves)[0];
            var colors = possibleMoves[value];

            colors.array.forEach(element => {
                dojo.query( '.square.'+element+value ).addClass( 'possibleMove' );
            });

            this.addTooltipToClass( 'possibleMove', '', _('Place a disc here') );
       },

       updateDiceValues: function( diceResults )
       {
            // Remove current values
            for( var x=1; x <= 6; x++ )
            {
                dojo.query( '.dice' ).removeClass( 'd6-v'+x );
            }
            console.log('diceResults');

            for( var key in diceResults )
            {
                dojo.query( '.dice.'+key ).addClass('d6-v'+diceResults[key]);
            }
       },
        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        onPlayWhiteDice: function( evt )
        {
            console.log('onPlayWhiteDice');

            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this actions is possible
            if( !this.checkAction('playWhiteDice') )
            {
                return;
            }

            this.ajaxcall( "/osuarezqwixxduel/osuarezqwixxduel/playWhiteDice.html", {
                lock: true,
            },
            this, function( result ){
                // what to do after call if it succeeded
                // most of the time: nothing
            }, function( is_error ){
                // what to do after the server call in anyway success or failure
                // most of the time: nothing
            })
        },

        onPlayColorDie: function( evt )
        {
            console.log('onPlayColorDie');

            // Prventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible
            if( !this.checkAction('playColorDie') )
            {
                return;
            }
            var selectedDice = dojo.query('.dice.dieClicked')
            this.ajaxcall( "/osuarezqwixxduel/osuarezqwixxduel/playColorDie.html", {
                lock: true,
                diceValues: dojo.attr(selectedDice, 'data-value')
            },
            this, function( result ) {
                // what to do after call if it succeeded
                // most of the time: nothing
            }, function( is_error ) {
                // what to do after call if it succeeded
                // most of the time: nothing
            })
        },

        onPass: function( evt )
        {
            console.log('onPass');

            // Prevent default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible
            if ( !this.checkAction('pass') )
            {
                return;
            }

            this.ajaxcall("/osuarezqwixxduel/osuarezqwixxduel/pass.html", {
                lock: true
            },
            this, function( result ){
                // what to do after call if it succeded
                // most of the time: nothing
            }, function ( is_error ) {
                // what to do after call if it not succeeded
                // most of the time: nothing
            })
        },

        onPlayToken: function( evt )
        {
            console.log('onPlayToken');

            // Prevent default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible
            if( !this.checkAction('playToken') )
            {
                return;
            }

            // Get the clicked square x and y
            var coords = evt.currentTarget.id.split('_');
            var x = coords[1];
            var y = coords[2];

            if( !dojo.hasClass( 'square_'+x+'_'+y, 'possibleMove' ) )
            {
                // This is not a possible move => the click does nothing
                return;
            }


            this.ajaxcall("/osuarezqwixxduel/osuarezqwixxduel/playToken.html", {
                lock: true,
                x: x,
                y: y
            },
            this, function( result ){
                // what to do after call if it succeded
                // most of the time: nothing
            }, function ( is_error ) {
                // what to do after call if it not succeeded
                // most of the time: nothing
            })
        },


        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/osuarezqwixxduel/osuarezqwixxduel/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your osuarezqwixxduel.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        
        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});

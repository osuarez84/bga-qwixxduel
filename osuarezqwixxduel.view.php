<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * osuarezqwixxduel implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * osuarezqwixxduel.view.php
 *
 * This is your "view" file.
 *
 * The method "build_page" below is called each time the game interface is displayed to a player, ie:
 * _ when the game starts
 * _ when a player refreshes the game page (F5)
 *
 * "build_page" method allows you to dynamically modify the HTML generated for the game interface. In
 * particular, you can set here the values of variables elements defined in osuarezqwixxduel_osuarezqwixxduel.tpl (elements
 * like {MY_VARIABLE_ELEMENT}), and insert HTML block elements (also defined in your HTML template file)
 *
 * Note: if the HTML of your game interface is always the same, you don't have to place anything here.
 *
 */
  
require_once( APP_BASE_PATH."view/common/game.view.php" );
  
class view_osuarezqwixxduel_osuarezqwixxduel extends game_view
{
    protected function getGameName()
    {
        // Used for translations and stuff. Please do not modify.
        return "osuarezqwixxduel";
    }
    
  	function build_page( $viewArgs )
  	{		
  	    // Get players & players number
        $players = $this->game->loadPlayersBasicInfos();
        $players_nbr = count( $players );

        /*********** Place your code below:  ************/
       
        $this->page->begin_block( "osuarezqwixxduel_osuarezqwixxduel", "square" );

        $hor_scale = 101.5;
        $ver_scale = 93;
        $y = 1;

        foreach( array("red", "yellow", "gree", "blue") as $color )
        {
            if( $color == "red" || $color == "yellow" )
            {
                $counter = 2;
            }
            else
            {
                $counter = 12;
            }
            for( $x=1; $x<=11; $x++ )
            {
                $this->page->insert_block("square", array(
                    'COLOR' => $color,
                    'X' => $x,
                    'VALUE' => $counter,
                    'LEFT' => round( ($x-1)*$hor_scale+101 ),
                    'TOP' => round( ($y-1)*$ver_scale+70 )
                ));
                if( $color == "red" || $color == "yellow" )
                {
                    $counter++;
                }
                else 
                {
                    $counter--;
                }
            }
            $y++;
        }

        // TODO
        // Add block for the padlock squares

        $this->page->begin_block( "osuarezqwixxduel_osuarezqwixxduel", "square_pass" );

        $hor_scale = 101.5;
        $ver_scale = 93;
        for( $x=1; $x<= 2; $x++ )
        {
            for( $y=1; $y<=2; $y++ )
            {
                $this->page->insert_block("square_pass", array(
                    'X' => $x,
                    'Y' => $y,
                    'LEFT' => round( ($x-1)*$hor_scale+1386 ),
                    'TOP' => round( ($y-1)*$ver_scale+70 )
                ));
            }
        }
        /*
        
        // Examples: set the value of some element defined in your tpl file like this: {MY_VARIABLE_ELEMENT}

        // Display a specific number / string
        $this->tpl['MY_VARIABLE_ELEMENT'] = $number_to_display;

        // Display a string to be translated in all languages: 
        $this->tpl['MY_VARIABLE_ELEMENT'] = self::_("A string to be translated");

        // Display some HTML content of your own:
        $this->tpl['MY_VARIABLE_ELEMENT'] = self::raw( $some_html_code );
        
        */
        
        /*
        
        // Example: display a specific HTML block for each player in this game.
        // (note: the block is defined in your .tpl file like this:
        //      <!-- BEGIN myblock --> 
        //          ... my HTML code ...
        //      <!-- END myblock --> 
        

        $this->page->begin_block( "osuarezqwixxduel_osuarezqwixxduel", "myblock" );
        foreach( $players as $player )
        {
            $this->page->insert_block( "myblock", array( 
                                                    "PLAYER_NAME" => $player['player_name'],
                                                    "SOME_VARIABLE" => $some_value
                                                    ...
                                                     ) );
        }
        
        */



        /*********** Do not change anything below this line  ************/
  	}
}

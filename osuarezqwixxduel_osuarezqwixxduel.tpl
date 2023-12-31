{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- osuarezqwixxduel implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    osuarezqwixxduel_osuarezqwixxduel.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->

<div id="board">
    <!-- BEGIN square -->
        <div id="square_{COLOR}_{X}" class="square {COLOR} {VALUE}" style="left: {LEFT}px; top: {TOP}px;"></div>
    <!-- END square -->

    <!-- BEGIN square_pass -->
        <div id="square_{X}_{Y}" class="square" style="left: {LEFT}px; top: {TOP}px;"></div>
    <!-- END square_pass -->
    <div id="tokens">
    </div>
</div>

<div id="dice_wrap" class="whiteblock">
    <h3>Dice Pool</h3>
    <div class="dice white1 d6-v1"></div>
    <div class="dice white2 d6-v1"></div>
    <div class="dice color blue d6-v1"></div>
    <div class="dice color green d6-v1"></div>
    <div class="dice color yellow d6-v1"></div>
    <div class="dice color red d6-v1"></div>
</div>


<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';

*/

</script>  

{OVERALL_GAME_FOOTER}

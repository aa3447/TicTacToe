
var p1 = "";
var com = "";
var board = [
    ["-","-","-"],
    ["-","-","-"],
    ["-","-","-"]
];

// JavaScrit inplamentaiion of http://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(b){
    for (var i = 0; i<3; i++){
        for (var j = 0; j<3; j++){
            if (b[i][j]==="-"){
                return true;
                }
            }
        }
    return false;
}
 
// This is the evaluation function as discussed
// in the previous article ( http://goo.gl/sJgv68 )
function evaluate(b){
    // Checking for Rows for X or O victory.
    for (var row = 0; row<3; row++){
        if (b[row][0]===b[row][1] &&
            b[row][1]===b[row][2])
        {
            if (b[row][0]===com){
                return +10;
            }
            else if (b[row][0]===p1){
                return -10;
            }
        }
    }
 
    // Checking for Columns for X or O victory.
    for (var col = 0; col<3; col++){
        if (b[0][col]===b[1][col] &&
            b[1][col]===b[2][col]){
            if (b[0][col]===com){
                return +10;
            }
            else if (b[0][col]===p1){
                return -10;
            }
        }
    }
 
    // Checking for Diagonals for X or O victory.
    if (b[0][0]===b[1][1] && b[1][1]===b[2][2]){
        if (b[0][0]===com){
            return +10;
        }
        else if (b[0][0]==p1){
            return -10;
        }
    }
 
    if (b[0][2]===b[1][1] && b[1][1]===b[2][0]){
        if (b[0][2]===com){
            return +10;
        }
        else if (b[0][2]===p1){
            return -10;
        }
    }
 
    // Else if none of them have won then return 0
    return 0;
}
 
// This is the minimax function. It considers all
// the possible ways the game can go and returns
// the value of the board
function minimax( b,  depth,isMax){
    var score = evaluate(b);
 
    // If Maximizer has won the game return his/her
    // evaluated score
    if (score === 10){
        return score;
    }
    // If Minimizer has won the game return his/her
    // evaluated score
    if (score === -10){
        return score;
    }
    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft(board)===false){
        return 0;
    }
    // If this maximizer's move
    if (isMax){
        var best = -1000;
        // Traverse all cells
        for (var i = 0; i<3; i++){
            for (var j = 0; j<3; j++){
                // Check if cell is empty
                if (b[i][j]==="-"){
                    // Make the move
                    b[i][j] = com;
                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max( best,minimax(b, depth+1, !isMax) - depth );
                    // Undo the move
                    b[i][j] = "-";
                }
            }
        }
        return best;
    }
 
    // If this minimizer's move
    else{
        var best = 1000;
        // Traverse all cells
        for (var i = 0; i<3; i++){
            for (var j = 0; j<3; j++){
                // Check if cell is empty
                if (b[i][j]==="-"){
                    // Make the move
                    b[i][j] = p1;
                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best,minimax(b, depth+1, !isMax) + depth);
                    // Undo the move
                   b[i][j] = "-";
                }
            }
        }
        return best;
    }
}
 
// This will return the best possible move for the player
function findBestMove(b){
    var bestVal = -1000;
    var bestMove = [];
    // Traverse all cells, evalutae minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (var i = 0; i<3; i++){
        for (var j = 0; j<3; j++){
            // Check if celll is empty
            if (b[i][j]==="-"){
                // Make the move
                b[i][j] = com;
 
                // compute evaluation function for this
                // move.
                var moveVal = minimax(b, 0, false);
 
                // Undo the move
                b[i][j] = "-";
 
                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    bestMove[0] = i;
                    bestMove[1] = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    
        board[bestMove[0]][bestMove[1]] = com;
        var button = (bestMove[0]*3) + bestMove[1];
        $("#"+button).text(com);
        $("#"+button).prop("disabled",true);
    if( evaluate(board) === 10){
        $("#win").text("Computer Wins!");
        var score = parseInt($("#computerScore").text()) + 1;
        $("#computerScore").text(score);
        $("tr button").prop("disabled",true);
    }   
    else if(!isMovesLeft(board)){
        $("#win").text("Tie!");
        $("tr button").prop("disabled",true);
    }
    
}

$(function() {
     $("td").css("border", "3px solid black");
      $("#NightMode").click(function(){
          if($("#NightMode").text() === "Night Mode")
        {
            $("body").css("background-color","black");
            $("body").css("color", "orange");
            $("button").css("color", "orange")
            $("td").css("border", "3px solid orange");
            $("#NightMode").text("Day Mode");
        }
          else{
            $("body").css("background-color","white");
            $("body").css("color", "black");
            $("td").css("border", "3px solid black");
            $("button").css("color", "black");
            $("#NightMode").text("Night Mode");
          }
     });
     $("#Chose_X").click(function(){
            p1 = "X";
            com = "O";
            $("#Chose_X").prop("disabled",true);
            $("#Chose_O").prop("disabled",true);
            $("tr button").prop("disabled",false);
     });
    $("#Chose_O").click(function(){
            p1 = "O";
            com = "X";
            $("#Chose_X").prop("disabled",true);
            $("#Chose_O").prop("disabled",true);  
            $("tr button").prop("disabled",false);
            var row = Math.floor((Math.random() * 3));
            var col = Math.floor((Math.random() * 3));
            board[row][col] = com;
            var button = (row*3) + col;
            $("#"+button).text(com);
            $("#"+button).prop("disabled",true);
     });
    $("#NewGame").click(function(){
            p1 = "";
            com = "";
            $("#Chose_X").prop("disabled",false);
            $("#Chose_O").prop("disabled",false);
            $("tr button").text("-");
            $("tr button").prop("disabled",true); 
            board = [
                ["-","-","-"],
                ["-","-","-"],
                ["-","-","-"]
            ];
            $("#win").text("");
     });
    $(".grid").click(function(){
            var id = parseInt($(this).attr('id'));  
            $(this).text(p1);       
            var row = Math.floor(id/3);
            var col = id%3;
            board[row][col] = p1; 
        if( evaluate(board) === -10){
            $("#win").text("Player Wins!");
            $("tr button").prop("disabled",true);
        } 
        else if(!isMovesLeft(board)){
            $("#win").text("Tie!");
            $("tr button").prop("disabled",true);
        } 
        else{
            $("#0").prop("disabled",true);
            findBestMove(board);
        }      
                     
 
 
        });
});
   

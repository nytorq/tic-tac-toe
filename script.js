const gameBoard = (function () {
    const columns = 3;
    const rows = 3;
    const board = [];
    const playerFactory = (name, turn, marker) => {
        return { name , turn, marker}
    }

    for (i=0 ; i < rows ; i++) {
        let currentRow = [];
        board.push(currentRow);
        for (j=0 ; j < columns ; j++) {
            function createCell(cellValue = '') {
                return cellValue;
            }
            currentRow.push(createCell())
        }
    }

    console.log('Start of the game board:')
    console.log(board);
    
    const playRound = (position, marker) => {
        if (board[position[0]][position[1]]) {
            console.log("This cell is already taken. Please choose another.")
        } else {
            board[position[0]][position[1]] = marker;
        }
        // Evaluate rows
        for (i = 0 ; i < board.length ; i++) {
            if ( Object.is(marker, board[i][0]) && Object.is(marker, board[i][1]) && Object.is(marker, board[i][2])) {
                console.log(`Winner is marker "${marker}", found in board[${[i]}] row!`);
            }

        }
        // Evalutate cols
        for (i = 0 ; i < board.length ; i++) {
            if ( Object.is(marker, board[0][i]) && Object.is(marker, board[1][i]) && Object.is(marker, board[2][i])) {
                console.log(`Winner is marker "${marker}", found in board[${[i]}] col!`);
            }
        }

        // Evaluating diagonals
            // Diagonal going from top-left to bottom-right
            if ( Object.is(marker, board[0][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[2][2]) )  {
                console.log(`Winner is marker "${marker}", found in top-left to bottom-right diagonal.`);
            }

            // Diagonal going from bottom-left to top-right
            if ( Object.is(marker, board[2][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[0][2]) ) {
                console.log(`Winner is marker "${marker}", found in bottom-left to top-right diagonal.`);
            }

        console.log(board);
    }

    // const evaluator = () => {
    //     // Horizontal checks
    //     for (i = 0 ; i < board.length ; i++) {
    //         if ( board[i][0] === board[i][1] === board[i][2] ) {
    //             console.log("Winner found in " + board[i] + " row!")
    //         }
    //     }
    // } 

    return { board, playRound, playerFactory };   
})();
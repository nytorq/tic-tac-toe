const gameBoard = (function () {
    const columns = 3;
    const rows = 3;
    const board = [];
    const players = [
        {
            id: 1,
            marker: 'X',
        },
        {
            id: 2,
            marker: 'O'
        }
    ];
    
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
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

    const evaluateRows = () => {
        let marker = activePlayer.marker
        let winner;
        // for (i = 0 ; i < board.length ; i++) {
        //     if ( Object.is(marker, board[i][0]) && Object.is(marker, board[i][1]) && Object.is(marker, board[i][2])) {
        //         console.log(`Player ${activePlayer.id} has won the game. Found in board[${[i]}] row!`);
        //     } else if (Object.is(marker, board[0][i]) && Object.is(marker, board[1][i]) && Object.is(marker, board[2][i])) {
        //         console.log(`Player ${activePlayer.id} has won the game. Found in board[${[i]}] col!`);
        //     } else if (Object.is(marker, board[0][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[2][2])) {
        //         console.log(`Player ${activePlayer.id} has won the game. Found in top-left to bottom-right diagonal.`);
        //     } else if (Object.is(marker, board[2][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[0][2])) {
        //         console.log(`Player ${activePlayer.id} has won the game. Found in bottom-left to top-right diagonal.`);
        //     }
        // }

        for (i = 0 ; i < board.length ; i++) {
            if ( Object.is(marker, board[i][0]) && Object.is(marker, board[i][1]) && Object.is(marker, board[i][2])) {
                winner = activePlayer.id;
            } else if (Object.is(marker, board[0][i]) && Object.is(marker, board[1][i]) && Object.is(marker, board[2][i])) {
                winner = activePlayer.id;
            } else if (Object.is(marker, board[0][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[2][2])) {
                winner = activePlayer.id;
            } else if (Object.is(marker, board[2][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[0][2])) {
                winner = activePlayer.id;
            }
        }

        if (winner) {
            console.log(`Player ${activePlayer.id} has won the game.`);
        } else {
            switchPlayerTurn();
            console.log(`Player ${activePlayer.id} it's your turn. Use gameBoard.playRound() to make a move.`)
        }
        console.log(board);
    }    
    
    const playRound = (position) => {
        if (board[position[0]][position[1]]) {
            console.log("This cell is already taken. Please choose another.")
        } else {
            board[position[0]][position[1]] = activePlayer.marker;
            evaluateRows();
        }
    }
    return { board, playRound, players };   
})();
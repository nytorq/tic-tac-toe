const ticTacToe = (function () {
    const columns = 3;
    const rows = 3;
    const board = [];
    let turns = 0;
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

    const createBoard = () => {
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
    }
    createBoard();

    const clearBoard = () => {
        for (i = 0 ; i < board.length ; i++) {
            for (j = 0 ; j < board.length ; j++) {
                board[i][j] = '';
            }   
        }
        console.log("The gameboard has been cleared", '\n', board)
    };

    const evaluateRows = () => {
        let marker = activePlayer.marker
        let winner;

        // Check for a winner
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
        } else if (turns === 8) {
            console.log('Stalemate!');
        } else {
            switchPlayerTurn();
            console.log(`Player ${activePlayer.id} it's your turn. Use ticTacToe.playRound() to make a move.`)
        }
        console.log(board);
    }
    
    const playRound = (position) => {
        if (board[position[0]][position[1]]) {
            console.log("This cell is already taken. Please choose another.")
        } else {
            board[position[0]][position[1]] = activePlayer.marker;
            evaluateRows();
            ticTacToe.turns += 1;
        }
    }
    
    return { board, playRound, players, turns, clearBoard};
})();

function ScreenController() {
    const GameBoard = document.createElement('div');
    GameBoard.className = 'gameBoard';
    document.body.appendChild(GameBoard);
    for (i = 0 ; i < 9 ; i++) {
        let cell = document.createElement('button');
        cell.className = 'gameBoardCell';
        cell.setAttribute('cell-id',`${i}`)
        cell.addEventListener('click',()=>console.log(`cell ${cell.getAttribute('cell-id')}`));
        GameBoard.appendChild(cell);
    }
    
    const insertMarker = () => {
        /*
        - Click event sends up cell id
        - Transpose cell id to equivalent item in array
        - Call the playRound() function and pass the above value as an argument
        - 
        */
    }
}

ScreenController();
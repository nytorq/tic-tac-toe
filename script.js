const ticTacToe = (function () {
    const columns = 3;
    const rows = 3;
    let board = [];
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
        ticTacToe.activePlayer = ticTacToe.activePlayer === players[0] ? players[1] : players[0];
    }

    // const displayConsoleBoard = () => {
    //     for (i = 0 ; i < rows ; i++) {
    //         let tempRow = [];
    //         tempRow.push(board[i].pop())
    //         console.log(tempRow)
    //     }
    // }

    // displayConsoleBoard();
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
            console.log(`Player ${ticTacToe.activePlayer.id} has won the game.`);
        } else if (turns === 8) {
            console.log('Stalemate!');
        } else {
            switchPlayerTurn();
            console.log(`Player ${ticTacToe.activePlayer.id} it's your turn. Use ticTacToe.playRound() to make a move.`)
        }
        console.log(board);
    }
    
    const playRound = (position) => {
        if (board[position[0]][position[1]]) {
            console.log("This cell is already taken. Please choose another.")
        } else {
            board[position[0]][position[1]] = ticTacToe.activePlayer.marker;
            evaluateRows();
            ticTacToe.turns += 1;
        }
    }
    
    return { board, playRound, players, activePlayer, turns, clearBoard};
})();


const ScreenController = (function() {
    const translator = new Map();
    translator.set(0, [0,0]);
    translator.set(1, [0,1]);
    translator.set(2, [0,2]);
    translator.set(3, [1,0]);
    translator.set(4, [1,1]);
    translator.set(5, [1,2]);
    translator.set(6, [2,0]);
    translator.set(7, [2,1]);
    translator.set(8, [2,2]);
    const GameBoard = document.createElement('div');
    GameBoard.className = 'gameBoard';
    document.body.appendChild(GameBoard);
    let cell;
    const getCellID = (cell) => {
        // cell.prototype.id = cell.getAttribute('cell-id');
        return cell.target.getAttribute('cell-id');
    }
    const insertMarker = (cell) => {
        /*
        - Click event sends up cell id
        - Transpose cell id to equivalent item in array
        - Call the playRound() function and pass the above value as an argument
        */
        // console.log(getCellID(cell));
        let arrayPosition = translator.get(Number(getCellID(cell)));
        cell.target.innerHTML = ticTacToe.activePlayer.marker;
        ticTacToe.playRound(arrayPosition)
    }
    for (i = 0 ; i < 9 ; i++) {
        cell = document.createElement('button');
        cell.className = 'gameBoardCell';
        cell.setAttribute('cell-id',`${i}`)
        cell.addEventListener('click', insertMarker);
        GameBoard.appendChild(cell);
    }
    return {translator}
})();
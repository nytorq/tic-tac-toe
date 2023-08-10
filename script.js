const ticTacToe = (function () {
    const columns = 3;
    const rows = 3;
    let board = [];
    let turns = 0;
    const players = [
        {
            id: 1,
            marker: 'X',
            name: ''
        },
        {
            id: 2,
            marker: 'O',
            name: ''
        }
    ];
    const gameStatus = {
        winner: '',
        winnerName: '',
        winnerId: '',
        winningCells: []
    }
    
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
        event.preventDefault();
        for (i = 0 ; i < board.length ; i++) {
            for (j = 0 ; j < board.length ; j++) {
                board[i][j] = '';
            }   
        }
        let cells = document.getElementsByClassName('gameBoardCell');
        for (i = 0 ; i < cells.length ; i++) {
            cells[i].innerHTML = '';
            cells[i].classList.remove('winningCell');
        }
        ticTacToe.gameStatus.winner = '';
        ticTacToe.gameStatus.winningCells = [];

        console.log("The game has been reset", '\n', board)
    };

    const evaluateRows = () => {
        let marker = ticTacToe.activePlayer.marker
        // let winner;

        // Check for a winner
        for (i = 0 ; i < board.length ; i++) {
            if  // Checking rows...
                (Object.is(marker, board[i][0]) && Object.is(marker, board[i][1]) && Object.is(marker, board[i][2])) {
                ticTacToe.gameStatus.winner = activePlayer.id;
                ticTacToe.gameStatus.winnerName = ticTacToe.players[activePlayer.id].name
                ticTacToe.gameStatus.winnerId = ticTacToe.players[activePlayer.id].id
                ticTacToe.gameStatus.winningCells.push([parseInt(`${i}`),0], [parseInt(`${i}`),1], [parseInt(`${i}`),2]);
                ScreenController.displayWin();
            }   // Checking columns
                else if (Object.is(marker, board[0][i]) && Object.is(marker, board[1][i]) && Object.is(marker, board[2][i])) {
                ticTacToe.gameStatus.winner = activePlayer.id;
                ticTacToe.gameStatus.winnerName = ticTacToe.players[activePlayer.id].name
                ticTacToe.gameStatus.winnerId = ticTacToe.players[activePlayer.id].id
                ticTacToe.gameStatus.winningCells.push([0,parseInt(`${i}`)], [1,parseInt(`${i}`)], [2,parseInt(`${i}`)]);
                ScreenController.displayWin();
            }
        }
        // Checking top-left to bottom-right diagonal
        if (Object.is(marker, board[0][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[2][2])) {
            ticTacToe.gameStatus.winner = activePlayer.id;
            ticTacToe.gameStatus.winnerName = ticTacToe.players[activePlayer.id].name
            ticTacToe.gameStatus.winnerId = ticTacToe.players[activePlayer.id].id
            ticTacToe.gameStatus.winningCells.push([0,0],[1,1],[2,2]);
            ScreenController.displayWin();
        }   // Checking bottom-left to top-right diagonal
            else if (Object.is(marker, board[2][0]) && Object.is(marker, board[1][1]) && Object.is(marker, board[0][2])) {
            ticTacToe.gameStatus.winner = activePlayer.id;
            ticTacToe.gameStatus.winnerName = ticTacToe.players[activePlayer.id].name
            ticTacToe.gameStatus.winnerId = ticTacToe.players[activePlayer.id].id
            ticTacToe.gameStatus.winningCells.push([2,0],[1,1],[0,2]);
            ScreenController.displayWin();
        }

        if (ticTacToe.gameStatus.winner) {
            console.log(`Player ${ticTacToe.gameStatus.winner} has won the game.`);
        } else if (turns === 8) {
            console.log('Stalemate!');
        } else {
            switchPlayerTurn();
            console.log(`Player ${ticTacToe.gameStatus.winner} it's your turn. Use ticTacToe.playRound() to make a move.`)
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
    
    return { board, playRound, players, activePlayer, turns, clearBoard, gameStatus};
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
    const nameInputs = document.getElementsByClassName('nameInputs')
    const cells = document.getElementsByClassName('gameBoardCell');
    GameBoard.className = 'gameBoard';
    document.body.appendChild(GameBoard);
    let cell;
    const getCellID = (cell) => {
        // cell.prototype.id = cell.getAttribute('cell-id');
        return cell.target.getAttribute('cell-id');
    }
    const insertMarker = (cell) => {
        let arrayPosition = translator.get(Number(getCellID(cell)));
        cell.target.innerHTML = ticTacToe.activePlayer.marker;
        if (ticTacToe.activePlayer.marker == 'O') {
            cell.target.style.color = '#0093ff';
        }
        ticTacToe.playRound(arrayPosition)
    }
    for (i = 0 ; i < 9 ; i++) {
        cell = document.createElement('button');
        cell.className = 'gameBoardCell';
        cell.setAttribute('cell-id',`${i}`)
        cell.addEventListener('click', insertMarker);
        GameBoard.appendChild(cell);
    }

    const recordPlayerName = (event) => {
        // console.log(event)
        // console.log(event.srcElement.id)
        // console.log(event.target.value);
        // console.log(event.srcElement.id);
        if (event.srcElement.id == 'player1Name') {
            ticTacToe.players[0].name = event.target.value;
            console.log(`Player 1's name is now ${ticTacToe.players[0].name}`)
        } else {
            ticTacToe.players[1].name = event.target.value;
            console.log(`Player 2's name is now ${ticTacToe.players[1].name}`)
        }
    }

    
    for (i = 0 ; i < 2 ; i++) {
        nameInputs[i].addEventListener('blur', recordPlayerName)
    }
    
    const displayWin = () => {
        for (i = 0 ; i < ticTacToe.gameStatus.winningCells.length ; i++) {
            for (j = 0 ; j < 9 ; j++) {
                if (ScreenController.translator.get(j).toString() == ticTacToe.gameStatus.winningCells[i].toString()) {
                    // ScreenController.cells[j].style.border = '3px solid white';
                    // ScreenController.cells[j].style.boxShadow = 'inset 0 0 20px 9px #00ffa18f';
                    ScreenController.cells[j].classList.add('winningCell');
                }
            }            
        }
        let winningModal = document.getElementsByClassName('modalAndOverlay');
        const winningPlayer = document.getElementById('winningPlayer');
        if (ticTacToe.gameStatus.winnerName) {
            winningPlayer.innerText = ticTacToe.gameStatus.winnerName;
        } else {
            winningPlayer.innerText = `Player ${ticTacToe.gameStatus.winner}`;
        }
        winningPlayer.innerText
        winningModal[0].classList.remove('hidden');
    }
    
    return {translator, nameInputs, displayWin, cells}
})();
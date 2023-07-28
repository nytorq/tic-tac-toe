const gameBoard = (function () {
    const columns = 3;
    const rows = 3;
    const board = [];

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
    // const playerCreator = (name, marker) => {
    //     return {name, marker}
    // }
    
    const playRound = (position) => {
        let row = position[1];
        let col = position[0];
        board[row][col] = 'X';
        console.log(board);
    }
    return { board, playRound };   
})();
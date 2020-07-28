import React from 'react';

export default function checkIfValidMove(initial_click, row, col, grid){

    const prev_row = initial_click[0];
    const prev_col = initial_click[1];
    var new_grid = grid.slice();
    const piece = new_grid[prev_row][prev_col].piece;
    var isValid = false;
    if(piece === "rook") isValid = checkIfValidMoveRook(prev_row, prev_col, row, col, new_grid);

    if(isValid) new_grid = getNewGrid(prev_row, prev_col, row, col, new_grid);

    return [isValid, new_grid];
}


const checkIfValidMoveRook = (prev_row, prev_col, row, col, new_grid) => {

    if(!(row === prev_row || col === prev_col)) return false;
    var isValid = true;
    if(col === prev_col){
        if(new_grid[Math.min(row, prev_row)][col].isBottom) isValid = false;
        for(let i = Math.min(row, prev_row) +1; i < Math.max(row, prev_row); i+=1){
            
            if(new_grid[i][col].isTop || new_grid[i][col].isBottom){
                isValid = false;
                break;
            }
        }
        if( new_grid[Math.max(row, prev_row)][col].isTop ) isValid = false;
    }
    else {
        if(new_grid[row][Math.min(col, prev_col)].isRight) isValid = false;
        for(let i = Math.min(col, prev_col) +1; i < Math.max(col, prev_col); i+=1){
            
            if(new_grid[row][i].isLeft || new_grid[row][i].isRight){
                isValid = false;
                break;
            }
        }
        if( new_grid[row][Math.max(col, prev_col)].isLeft ) isValid = false;
    }
    return isValid;
};

const getNewGrid = (prev_row, prev_col, row, col, new_grid) => {

    const node_prev = new_grid[prev_row][prev_col];
    const node_next = new_grid[row][col];

    const new_node_prev = {
        ...node_prev,
        player: 0,
        piece: "",
    };

    const new_node_next = {
        ...node_next,
        player: node_prev.player,
        piece: node_prev.piece,
    };

    new_grid[row][col] = new_node_next;
    new_grid[prev_row][prev_col] = new_node_prev;
};

/**
 * Takes the coordinates of first click and second click, and checks if the move is valid
 * Returns true/false correspondingly. new_grid is returned after making the changes in
 * case of valid move, otherwise the old grid is returned.
 * 
 * @param {list} initial_click 
 * @param {number} row 
 * @param {number} col 
 * @param {list} grid 
 * @return {boolean} isValid
 * @return {list} new_grid
 */
export default function checkIfValidMove(initial_click, row, col, grid){

    const prev_row = initial_click[0];
    const prev_col = initial_click[1];
    var new_grid = grid.slice();
    const piece = new_grid[prev_row][prev_col].piece;
    var isValid = false;
    switch(piece){
        case "rook"   :
                        console.log("ROOK MOVED");
                        isValid = checkIfValidMoveRook(prev_row, prev_col, row, col, new_grid);
                        break;
        case "king"   :
                        console.log("KING MOVED");
                        isValid = checkIfValidMoveKing(prev_row, prev_col, row, col, new_grid);
                        break;
        case "knight" :
                        console.log("KNIGHT MOVED");
                        break;
        case "bishop" :
                        console.log("BISHOP MOVED");
                        break;
        default       :
                        console.log("Unkown piece");
                        break;
    }

    if(isValid) new_grid = getNewGrid(prev_row, prev_col, row, col, new_grid);

    return [isValid, new_grid];
}
// Horizontal Wall means Wall in horizontal Direction
const hasHorizontalWall = (row, prev_col, end_col, new_grid) =>{
    for(let curr_col = Math.min(prev_col,end_col); curr_col< Math.max(prev_col,end_col); curr_col++ ){
        if(new_grid[row][curr_col].isRight || new_grid[row][curr_col+1].isLeft){
            return true;
        }
    }
    return false;
}

const hasVerticalWall = (col, prev_row, end_row, new_grid) =>{
    for(let curr_row = Math.min(prev_row,end_row); curr_row< Math.max(prev_row,end_row); curr_row++ ){
        if(new_grid[curr_row][col].isBottom || new_grid[curr_row+1][col].isTop){
            return true;
        }
    }
    return false;
}
// Diagonal Wall can be of 4 types:
/*
    |_  or _  or _ _ or  |
            |            |

*/
function numberRange (start, end) {
    if(start < end){
        return new Array(end - start + 1).fill().map((d, i) => i + start);
    }else{
        return new Array(start - end + 1).fill().map((d, i) => start - i);
    }
}

const hasDiagonalWall = (prev_row, prev_col, end_row, end_col, new_grid) =>{
    var horiWall1 = false;
    var vertiWall1 = false;
    var horiWall2 = false;
    var vertiWall2 = false;
    // start from the least col value cell and go to max col value cell.
    if(prev_col < end_col){
        var col_list = numberRange(prev_col,end_col);
        var row_list = numberRange(prev_row,end_row);
    }else{
        var col_list = numberRange(end_col,prev_col);
        var row_list = numberRange(end_row,prev_row);
    }
    for(let i = 0;i < row_list.length - 1; i++){
        horiWall1 = new_grid[row_list[i]][col_list[i]].isRight || new_grid[row_list[i]][col_list[i]+1].isLeft;
        vertiWall1 = new_grid[Math.min(row_list[i],row_list[i+1])][col_list[i]].isBottom || new_grid[Math.max(row_list[i],row_list[i+1])][col_list[i]].isTop;
        horiWall2 = new_grid[row_list[i+1]][(col_list[i])].isRight || new_grid[row_list[i+1]][(col_list[i+1])].isLeft;
        vertiWall2 = new_grid[Math.min(row_list[i],row_list[i+1])][col_list[i+1]].isBottom || new_grid[Math.max(row_list[i],row_list[i+1])][col_list[i+1]].isTop;

        if((horiWall1&&(horiWall2||vertiWall1))||(vertiWall1&&(horiWall1||vertiWall2)) || (horiWall2&&vertiWall2)){
            return true;
        }
    }
    return false;
}


const checkIfValidMoveKing = (prev_row, prev_col, row, col, new_grid) => {
    // Basic Chess move
    if(Math.abs(prev_col-col) > 1 || Math.abs(prev_row-row) > 1){
        return false;
    }
    var isValid = true;
    // Checking Wall Block
    // console.log(horiWall1+" "+horiWall2+" "+vertiWall1+" "+vertiWall2);
    if(prev_col === col){
        isValid = !(hasVerticalWall(prev_col, prev_row, row, new_grid));
    }else if(prev_row === row){
        isValid = !(hasHorizontalWall(prev_row, prev_col, col, new_grid));
    }else{
        isValid = !(hasDiagonalWall(prev_row, prev_col, row, col, new_grid));
    }
    return isValid;
};


const checkIfValidMoveRook = (prev_row, prev_col, row, col, new_grid) => {

    if(!(row === prev_row || col === prev_col)) return false;
    var isValid = true;

    if(col === prev_col){
        isValid = !hasVerticalWall(col, prev_row, row, new_grid);
        // if(new_grid[Math.min(row, prev_row)][col].isBottom) isValid = false;
        // for(let i = Math.min(row, prev_row) +1; i < Math.max(row, prev_row); i+=1){

        //     if(new_grid[i][col].isTop || new_grid[i][col].isBottom){
        //         isValid = false;
        //         break;
        //     }
        // }
        // if( new_grid[Math.max(row, prev_row)][col].isTop ) isValid = false;
    }
    else {
        isValid = !hasHorizontalWall(row, prev_col, col, new_grid);
        // if(new_grid[row][Math.min(col, prev_col)].isRight) isValid = false;
        // for(let i = Math.min(col, prev_col) +1; i < Math.max(col, prev_col); i+=1){

        //     if(new_grid[row][i].isLeft || new_grid[row][i].isRight){
        //         isValid = false;
        //         break;
        //     }
        // }
        // if( new_grid[row][Math.max(col, prev_col)].isLeft ) isValid = false;
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

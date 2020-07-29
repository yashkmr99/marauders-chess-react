/**
 * Returns the new grid after converting the current one with the sub-board moved
 * Board A: a = 0, b = 0
 * Board B: a = 0, b = 1
 * Board C: a = 0, b = 2
 * Board D: a = 1, b = 0
 * Board E: a = 1, b = 1
 * Board F: a = 1, b = 2
 * 
 * @param {list} grid 
 * @param {number} a 
 * @param {number} b
 * @return {list} new_grid
 */
export default function getNewGridWithRotated(grid,a,b){
    const newGrid = grid.slice();
    const newGridCopy = JSON.parse(JSON.stringify(newGrid));
    a*=5;
    b*=5;
    // for 3 & 5 length
    for(let j=0;j<=2;j+=1)
    {
        for(let i=0; i<(5-2*j); i+=1){
            const node = newGridCopy[a+((5-2*j)-1)-i+j][b+j];
            const newNode = {
                ...node,
                row: a+j,
                col: b+i+j,
                isRight: node.isTop,
                isLeft: node.isBottom,
                isBottom: node.isRight,
                isTop: node.isLeft,
                player: node.player,
                piece: node.piece,
            }
            newGrid[a+j][b+i+j] = newNode;
        }
        for(let i=0; i<(5-2*j); i++){
            const node = newGridCopy[a+j][b+i+j];
            const newNode = {
                ...node,
                row: a+i+j,
                col: b+4-j,
                isRight: node.isTop,
                isLeft: node.isBottom,
                isBottom: node.isRight,
                isTop: node.isLeft,
                player: node.player,
                piece: node.piece,
            }
            newGrid[a+i+j][b+4-j] = newNode;
        }
        for(let i=(5-2*j)-1; i>=0; i--){
            const node = newGridCopy[a+((5-2*j)-1)-i+j][b+4-j];
            const newNode = {
                ...node,
                row: a+4-j,
                col: b+i+j,
                isRight: node.isTop,
                isLeft: node.isBottom,
                isBottom: node.isRight,
                isTop: node.isLeft,
                player: node.player,
                piece: node.piece,
            }
            newGrid[a+4-j][b+i+j] = newNode;
        }
        for(let i=(5-2*j)-1; i>=0; i--){
            const node = newGridCopy[a+4-j][b+i+j];
            const newNode = {
                ...node,
                row: a+i+j,
                col: b+j,
                isRight: node.isTop,
                isLeft: node.isBottom,
                isBottom: node.isRight,
                isTop: node.isLeft,
                player: node.player,
                piece: node.piece,
            }
            newGrid[a+i+j][b+j] = newNode;
        }   
    }

    return newGrid;
}
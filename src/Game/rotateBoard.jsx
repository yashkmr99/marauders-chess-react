export default function getNewGridWithArotated(grid){
    const newGrid = grid.slice();
    const newGridCopy = JSON.parse(JSON.stringify(newGrid));
    
    // for 5 length
    for(let i=0; i<5; i+=1){
        const node = newGridCopy[4-i][0];
        const newNode = {
            ...node,
            row: 0,
            col: i,
            isRight: node.isTop,
            isLeft: node.isBottom,
            isBottom: node.isRight,
            isTop: node.isLeft,
            imgUrl: node.imgUrl,
        }
        newGrid[0][i] = newNode;
    }
    for(let i=0; i<5; i++){
        const node = newGridCopy[0][i];
        const newNode = {
            ...node,
            row: i,
            col: 4,
            isRight: node.isTop,
            isLeft: node.isBottom,
            isBottom: node.isRight,
            isTop: node.isLeft,
            imgUrl: node.imgUrl,
        }
        newGrid[i][4] = newNode;
    }
    for(let i=4; i>=0; i--){
        const node = newGridCopy[4-i][4];
        const newNode = {
            ...node,
            row: 4,
            col: i,
            isRight: node.isTop,
            isLeft: node.isBottom,
            isBottom: node.isRight,
            isTop: node.isLeft,
            imgUrl: node.imgUrl,
        }
        newGrid[4][i] = newNode;
    }
    for(let i=4; i>=0; i--){
        const node = newGridCopy[4][i];
        const newNode = {
            ...node,
            row: i,
            col: 0,
            isRight: node.isTop,
            isLeft: node.isBottom,
            isBottom: node.isRight,
            isTop: node.isLeft,
            imgUrl: node.imgUrl,
        }
        newGrid[i][0] = newNode;
    }

    return newGrid;
}
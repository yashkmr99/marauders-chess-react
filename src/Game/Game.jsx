import React, {Component} from 'react';
import './Game.css';
import Node from './Node/Node';
import initial_nodes from './initial_nodes.jsx';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col){
        if(!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp(){
        this.setState({mouseIsPressed: false});
    }

    rotateA(){
        const newGrid = getNewGridWithArotated(this.state.grid);
        this.setState({grid: newGrid});
    }

    render(){
        const {grid, mouseIsPressed} = this.state;
        return (
            <>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key = {rowIdx}>
                            {row.map((node, nodeIdx) => {

                                const {row, col, isLeft, isRight, isBottom, isTop, imgUrl} = node;
                                return (
                                    <Node
                                        key = {nodeIdx}
                                        row = {row}
                                        col = {col}
                                        isLeft = {isLeft}
                                        isRight = {isRight}
                                        isBottom = {isBottom}
                                        isTop = {isTop}
                                        mouseIsPressed = {mouseIsPressed}
                                        onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp = {() => this.handleMouseUp()}
                                        imgUrl = {imgUrl}
                                    ></Node>
                                );
                            })}
                        </div>
                    );

                })}
            </div>
            <button onClick = {() => this.rotateA()}>
                Rotate-A
            </button>
            </>
        );
    }
}

const getInitialGrid = () => {
    const initial_nodes_border = initial_nodes.get_initial_nodes();
    const grid = [];
    for(let row = 0; row < 10; row++) {
        const currentRow = [];
        for(let col = 0; col < 15; col++){
            const isLeft = initial_nodes_border[row*15+col][0];
            const isRight = initial_nodes_border[row*15+col][1];
            const isBottom = initial_nodes_border[row*15+col][2];
            const isTop = initial_nodes_border[row*15+col][3];
            var imgUrl = "";
            if(row === 0 && col === 0) imgUrl = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
            currentRow.push(createNode(col, row, isLeft, isRight, isBottom, isTop, imgUrl));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row, isLeft, isRight, isBottom, isTop, imgUrl) => {
    return {
        col,
        row,
        isLeft,
        isRight,
        isBottom,
        isTop,
        imgUrl,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithArotated = (grid) => {
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
};
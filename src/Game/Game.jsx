import React, {Component} from 'react';
import './Game.css';
import Node from './Node/Node';
import initial_nodes from './initial_nodes.jsx';
import getNewGridWithArotated from './rotateBoard.jsx';

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

                                const {row, col, isLeft, isRight, isBottom, isTop, player, piece} = node;
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
                                        player = {player}
                                        piece = {piece}
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
            const player = initial_nodes_border[row*15+col][4];
            const piece = initial_nodes_border[row*15+col][5];
            currentRow.push(createNode(col, row, isLeft, isRight, isBottom, isTop, player, piece));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row, isLeft, isRight, isBottom, isTop, player, piece) => {
    return {
        col,
        row,
        isLeft,
        isRight,
        isBottom,
        isTop,
        player,
        piece,
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
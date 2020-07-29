import React, {Component} from 'react';
import './Game.css';
import Node from './Node/Node';
import initial_nodes from './initial_nodes.jsx';
import getNewGridWithRotated from './rotateBoard.jsx';
import checkIfValidMove from './checkValidMove.jsx';
import './ui/headingNav.jsx';
import HeadingNav from './ui/headingNav.jsx';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            curr_player: 0,
            log_message: "",
            initial_click: [-1,-1],
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        const curr_player = 1;
        this.setState({grid, curr_player});
    }

    // handleMouseDown(row, col){
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid, mouseIsPressed: true});
    // }

    // handleMouseEnter(row, col){
    //     if(!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid});
    // }

    // handleMouseUp(){
    //     this.setState({mouseIsPressed: false});
    // }

    handleMouseClick(row, col, player){
        var log_message = "clicked row: " + row.toString() + " col: " + col.toString();
        var initial_click = [-1, -1];
        var curr_player = this.state.curr_player;

        // If current player selects one of its pieces. If already selected one, it is overwritten.
        if(player === curr_player){
            log_message += ". Player " + player.toString() + " piece selected.";
            initial_click = [row, col];
        }

        // If piece to move not slected, initial_click will be [-1,-1]
        else if (this.state.initial_click[0] === -1){
            log_message += ". Invalid click."
        }

        else{
            const [isValidMove, new_grid] = checkIfValidMove(this.state.initial_click, row, col, this.state.grid);
            if(isValidMove){
                log_message += ". Valid move.";
                this.setState({new_grid});
                curr_player = 3 - curr_player;
            }
            else log_message += ". Invalid move.";
            
        }

        this.setState({log_message, initial_click, curr_player});
    }

    rotateA(){
        const newGrid = getNewGridWithRotated(this.state.grid,0,0);
        this.setState({grid: newGrid});
    }
    rotateB(){
        const newGrid = getNewGridWithRotated(this.state.grid,0,1);
        this.setState({grid: newGrid});
    }
    rotateC(){
        const newGrid = getNewGridWithRotated(this.state.grid,0,2);
        this.setState({grid: newGrid});
    }
    rotateD(){
        const newGrid = getNewGridWithRotated(this.state.grid,1,0);
        this.setState({grid: newGrid});
    }
    rotateE(){
        const newGrid = getNewGridWithRotated(this.state.grid,1,1);
        this.setState({grid: newGrid});
    }
    rotateF(){
        const newGrid = getNewGridWithRotated(this.state.grid,1,2);
        this.setState({grid: newGrid});
    }

    render(){
        const {grid, mouseIsPressed, curr_player, log_message} = this.state;
        return (
            <>
            <HeadingNav/>
            <div class="row">
                <div class="leftcolumn">
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
                                                // onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
                                                // onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                                                // onMouseUp = {() => this.handleMouseUp()}
                                                onClick = {(row, col, player) => this.handleMouseClick(row, col, player)}
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
                    <button onClick = {() => this.rotateB()}>
                        Rotate-B
                    </button>
                    <button onClick = {() => this.rotateC()}>
                        Rotate-C
                    </button>
                    <button onClick = {() => this.rotateD()}>
                        Rotate-D
                    </button>
                    <button onClick = {() => this.rotateE()}>
                        Rotate-E
                    </button>
                    <button onClick = {() => this.rotateF()}>
                        Rotate-F
                    </button>
                </div>
                <div class="rightcolumn">
                    <div><h2>Current player: {curr_player}</h2>
                        <p>Log: {log_message}</p>
                    </div>
                </div>
            </div>
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

// const getNewGridWithWallToggled = (grid, row, col) => {
//     const newGrid = grid.slice();
//   const node = newGrid[row][col];
//   const newNode = {
//     ...node,
//     isWall: !node.isWall,
//   };
//   newGrid[row][col] = newNode;
//   return newGrid;
// };
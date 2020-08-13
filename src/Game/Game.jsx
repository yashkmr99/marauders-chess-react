import React, {Component} from 'react';
import './Game.css';
import Node from './Node/Node';
import initial_nodes from './initial_nodes.jsx';
import getNewGridWithRotated from './rotateBoard.jsx';
import checkIfValidMove from './checkValidMove.jsx';
import './ui/headingNav.jsx';
import HeadingNav from './ui/headingNav.jsx';
import GameInfo from './ui/gameInfo.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import OutsideGame from './ui/outsideGame.jsx';

import io from 'socket.io-client';

var serverURI = 'http://localhost:3001'; 

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            curr_player: 0,
            log_message: "",
            initial_click: [-1,-1],
            gameRunning: false,

            samePC: true,
            player1Time: 1200,  //Time in seconds
            player2Time: 1200,
        };
        this.startSamePC = this.startSamePC.bind(this);
        this.quitGame = this.quitGame.bind(this);
    }

    componentDidMount(){
        const grid = getInitialGrid();

        this.setState({grid});
        if(!this.state.samePC)
        {
            this.setState({curr_player:1});
            this.intervalID = setInterval(()=>{
                let player1Time = this.state.player1Time;
                let player2Time = this.state.player2Time;

                if(this.state.curr_player===1){
                    player1Time-=1;
                }
                else{
                    player2Time-=1;
                } 
                this.setState({player1Time, player2Time});
            },1000);
        }
    }
    
    
    handleMouseClick(row, col, player){
        var piece_killed = '';
        // let log_message = "clicked row: " + row.toString() + " col: " + col.toString();
        let log_message = "";
        let initial_click = [-1, -1];
        let curr_player = this.state.curr_player;
        if(!this.state.gameRunning || !this.state.samePC)
        {
            if(!this.state.gameRunning || this.user !== curr_player)   {return;}
        }
        // If current player selects one of its pieces. If already selected one, it is overwritten.
        if(player === curr_player){
            // log_message += ". Player " + player.toString() + " piece selected.";
            log_message += "Piece selected";
            initial_click = [row, col];
        }

        // If piece to move not slected, initial_click will be [-1,-1]
        else if (this.state.initial_click[0] === -1){
            log_message += "Invalid click"
        }

        else{
            initial_click = this.state.initial_click;
            var isValidMove = false; var new_grid;
            [isValidMove, new_grid, piece_killed] = checkIfValidMove(this.state.initial_click, row, col, this.state.grid);
            if(isValidMove){
                clearInterval(this.intervalID);
                initial_click = [-1,-1];
                log_message += "Valid move";
                this.setState({new_grid},()=>{if(!this.state.samePC){this.socket.emit('move made',this.state)}});

                curr_player = 3 - curr_player;
                
                this.intervalID = setInterval(()=>{
                    let player1Time = this.state.player1Time;
                    let player2Time = this.state.player2Time;

                    if(this.state.curr_player===1){
                        player1Time-=1;
                    }
                    else{
                        player2Time-=1;
                    } 
                    this.setState({player1Time, player2Time});
                },1000);
            }
            else log_message += "Invalid move";
            
        }

        this.setState({log_message, initial_click, curr_player},()=>{if(!this.state.samePC){this.socket.emit('move made',this.state)}});
        if(piece_killed === 'king'){
            this.quitGame();
            alert('Game Over: Player ' + (3-curr_player) + ' won !!');
        }
    }

    // Roatating also constitues 1 move
    rotate(a,b){
        let curr_player = this.state.curr_player;
        if(!this.state.gameRunning || !this.state.samePC)
        {
            if(!this.state.gameRunning || this.user !== curr_player)   {return;}
        }
        
        const newGrid = getNewGridWithRotated(this.state.grid,a,b);
        clearInterval(this.intervalID);
        curr_player = 3 - curr_player;
                
        this.intervalID = setInterval(()=>{
            let player1Time = this.state.player1Time;
            let player2Time = this.state.player2Time;

            if(this.state.curr_player===1){
                player1Time-=1;
            }
            else{
                player2Time-=1;
            } 
            this.setState({player1Time, player2Time});
        },1000);

        this.setState({grid: newGrid, curr_player},()=>{if(!this.state.samePC){this.socket.emit('move made',this.state)}});
    }

    joinRoom(roomId)
    {
        console.log(roomId);
        this.socket  = io(serverURI);
        
        this.socket.on('connect', () => {
            console.log("socket connected");
            this.socket.emit('send roomId',roomId,this.state); 
            this.socket.on('user',(data,state)=>{
                this.user = data;
                console.log(data);
                this.setState(state);
                /*
                    Make below display of who is white and black user friendly
                */
                let color = (this.user===1)?"white":"black";
                alert("Nigga u "+color);

                this.socket.on('second joined',()=>{
                    this.setState({curr_player:1});
                    this.intervalID = setInterval(()=>{
                        let player1Time = this.state.player1Time;
                        let player2Time = this.state.player2Time;

                        if(this.state.curr_player===1){
                            player1Time-=1;
                        }
                        else{
                            player2Time-=1;
                        } 
                        this.setState({player1Time, player2Time});
                    },1000);
                });
            });
            this.socket.on('board changed',(state)=>{
                // console.log(state);
                this.setState(state);
            });
        });
    }

    startNewRoom(){
        this.socket  = io(serverURI);
        
        const samePC = false;
        const gameRunning = true;
        const grid = getInitialGrid();
        // const curr_player = 1;
        this.setState({grid, gameRunning, samePC});
        this.socket.on('connect', () => {
            console.log("socket connected");
            this.socket.emit('create room',this.state);
            this.socket.on('room created',(roomId)=>{
                alert('Bitch roomId is '+roomId);
            }); 
            this.socket.on('user',(data,state)=>{
                this.user = data;
                console.log(data);
                this.setState(state);
                /*
                    Make below display of who is white and black user friendly
                */
                let color = (this.user===1)?"white":"black";
                alert("Nigga u "+color);
                
                this.socket.on('second joined',()=>{
                    this.setState({curr_player:1});
                    this.intervalID = setInterval(()=>{
                        let player1Time = this.state.player1Time;
                        let player2Time = this.state.player2Time;

                        if(this.state.curr_player===1){
                            player1Time-=1;
                        }
                        else{
                            player2Time-=1;
                        } 
                        this.setState({player1Time, player2Time});
                    },1000);
                });
            });
        
            this.socket.on('board changed',(state)=>{
                // console.log(state);
                this.setState(state);
            });
        });
    }

    startSamePC(timeLimitEntered){
        if(timeLimitEntered === '') return;
        const player1Time = parseInt(timeLimitEntered) * 60;
        const player2Time = parseInt(timeLimitEntered) * 60;
        const gameRunning = true;
        const grid = getInitialGrid();
        const curr_player = 1;
        this.setState({grid, curr_player, player1Time, player2Time, gameRunning});
    }

    timeOver(){
        clearInterval(this.intervalID);
        let p_won = this.state.curr_player===1 ? 'Player 2' : 'Player 1';
        this.quitGame();
        alert('Time Up: ' + p_won + ' won !!');
    }

    quitGame(){
        this.setState({gameRunning: false});
    }

    render(){
        const {grid, mouseIsPressed, curr_player, log_message, player1Time, player2Time} = this.state;
        return (
            <>
            <HeadingNav gameRunning = {this.state.gameRunning}
                        quitGame = {this.quitGame}/>
            <div class = "container-fluid">
            <div class="row">
                <div class = "col-sm-9" class = "col-md-9" class="col-lg-9">
                <button type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,0)}>
                        Rotate-A
                    </button>
                    <button type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,1)}>
                        Rotate-B
                    </button>
                    <button type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,2)}>
                        Rotate-C
                    </button>
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
                    
                    <button type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,0)}>
                        Rotate-D
                    </button>
                    <button type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,1)}>
                        Rotate-E
                    </button>
                    <button type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,2)}>
                        Rotate-F
                    </button>
                </div>
                {this.state.gameRunning
                ? <GameInfo   curr_player = {curr_player}
                                log_message = {log_message}
                                player1Time = {player1Time}
                                player2Time = {player2Time}
                                timeOver = {() => this.timeOver()} />
                : <OutsideGame startSamePC={this.startSamePC} 
                                joinRoom={(roomId)=>this.joinRoom(roomId)} 
                                startNewRoom={()=>this.startNewRoom()} />}
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

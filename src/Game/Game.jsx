import React, {Component} from 'react';
import './Game.css';
import './ui/ui.css';
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
            Id: 0,
            room_full: 0,
            runningSamePc: false,   // game being played is using sockets or on same pc
            winner_color: 0, // 1: white, 2: black
            timeLimit: "20", //In mins

            samePC: true,
            player1Time: 1200,  //Time in seconds
            player2Time: 1200,
            highlight: 0,
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
            this.setState({curr_player: 0}); // Donno why i need to add here as well
            this.endGame(1);
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
        
        this.resetStateVars();

        this.socket.on('connect', () => {
            console.log("socket connected");
            this.socket.emit('send roomId',roomId,this.state); 
            this.socket.once('user',(data,state)=>{
                this.user = data;
                this.me_ready = 0;
                this.opp_ready = 0;
                this.setState(state);
                console.log("Changing color");

                this.setState({gameRunning: true});
                this.setState({Id: parseInt(roomId), room_full: 2});
                /*
                    Make below display of who is white and black user friendly
                */
                let color = (this.user===1)?"white":"black";
                
                this.socket.on('player ready', ()=>{
                    this.opp_ready = 1;
                    console.log("Ready states : ", this.me_ready, this.opp_ready);
                    if(this.me_ready === 1){
                        this.resetRoomState(this.state.timeLimit);
                        this.setState({curr_player : 1});
                    }
                });

                this.socket.on('second joined',()=>{
                    this.setState({room_full: 2});
                    this.intervalID = setInterval(()=>{
                        let player1Time = this.state.player1Time;
                        let player2Time = this.state.player2Time;

                        if(this.state.curr_player===1){
                            player1Time-=1;
                        }
                        else if(this.state.curr_player===2){
                            player2Time-=1;
                        }
                        this.setState({player1Time, player2Time});
                    },1000);
                });
            });
            this.socket.on('surrender', (loser) =>{
                let winner = loser == 1 ? 2:1;
                this.setState({winner_color : winner});
                this.gameResult();
            });
            this.socket.on('board changed',(state)=>{
                // console.log(state);
                this.setState(state);
            });
            this.socket.on('opponent quit',()=>{
                this.quitGame();
                alert('Opponent quits: You won !!');        
            });
        });
    }

    resetStateVars(){
        const samePC = false;
        const gameRunning = true;
        const grid = getInitialGrid();
        const runningSamePc = false;
        const curr_player = 0;
        this.user = this.user == 1? 2:1;
        this.me_ready = 0;
        this.opp_ready = 0;
        const winner_color = 0;
        this.setState({grid, gameRunning, samePC, winner_color,runningSamePc, curr_player});
    }

    resetRoomState(timeLimitEntered){
        const samePC = false;
        const gameRunning = true;
        const grid = getInitialGrid();
        const player1Time= parseInt(timeLimitEntered) * 60;  //Time in seconds
        const player2Time= parseInt(timeLimitEntered) * 60;
        const runningSamePc = false;
        const curr_player = 0;
        this.user = this.user == 1? 2: 1;
        this.me_ready = 0;
        this.opp_ready = 0;
        this.setState({grid, gameRunning, samePC, player1Time, player2Time, runningSamePc, curr_player});
    }

    startNewRoom(timeLimitEntered){
        if(timeLimitEntered === '') timeLimitEntered = '20';
        this.socket  = io(serverURI);
        
        this.setState({timeLimit: timeLimitEntered});

        this.resetRoomState(timeLimitEntered);
        this.user = 0;
        this.socket.on('connect', () => {
            console.log("socket connected");
            this.socket.emit('create room',this.state);
            this.socket.on('room created',(roomId)=>{
                this.setState({Id: roomId, room_full: 1});
            }); 
            this.socket.once('user',(data,state)=>{
                this.user = data;
                console.log(data);

                this.setState({gameRunning: true});
                // this.setState(state);
                /*
                    Make below display of who is white and black user friendly
                */
                let color = (this.user===1)?"white":"black";
                
                this.socket.on('player ready', ()=>{
                    this.opp_ready = 1;
                    console.log("In socket", this.me_ready, this.opp_ready);
                    if(this.me_ready === 1){
                        this.resetRoomState(this.state.timeLimit);
                        this.setState({curr_player : 1});
                    }
                });
                
                this.socket.on('second joined',()=>{
                    this.setState({room_full: 2});
                    this.intervalID = setInterval(()=>{
                        let player1Time = this.state.player1Time;
                        let player2Time = this.state.player2Time;

                        if(this.state.curr_player===1){
                            player1Time-=1;
                        }
                        else if(this.state.curr_player===2){
                            player2Time-=1;
                        }
                        this.setState({player1Time, player2Time});
                    },1000);
                });

                
            });
            this.socket.on('surrender', (loser) =>{
                let winner = loser == 1 ? 2:1;
                this.setState({winner_color : winner});
                this.gameResult();
            });
            this.socket.on('board changed',(state)=>{
                // console.log(state);
                this.setState(state);
            });
            this.socket.on('opponent quit',()=>{
                this.quitGame();
                alert('Opponent quits: You won !!');        
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
        const runningSamePc = true;
        this.setState({grid, curr_player, player1Time, player2Time, gameRunning, runningSamePc});
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

    timeOver(){
        let winner = this.state.curr_player===1 ? 2 : 1;
        this.socket.emit('end game', winner === 1?2:1);
        this.gameResult(winner);
        clearInterval(this.intervalID);
    }

    // argument 0: surrender, argument 1: King killed
    endGame(reason){
        let loser = reason === 0 ? this.user : (3-this.user);
        console.log("Called endGame here");
        this.socket.emit('end game', loser);
    }

    gameResult(){
        clearInterval(this.intervalID);
        this.setState({curr_player: 0});
        this.me_ready = 0;
        this.opp_ready = 0;
        console.log("WInner is : ",this.state.winner_color);
    }

    quitGame(){
        console.log(this.intervalID);
        clearInterval(this.intervalID);
        console.log(this.intervalID);
        if(this.socket) this.socket.disconnect(true);
        this.setState({gameRunning: false});
    }

    playerReady(){
        this.me_ready = 1;
        console.log("came here", this.me_ready);
        this.socket.emit("player ready");
        if(this.opp_ready === 1){
            console.log("Opponent is also ready : ", this.state.timeLimit);
            this.resetRoomState(this.state.timeLimit);
            this.setState({curr_player : 1});
        }else{
            console.log("Opponent isnt ready");
        }
    }

    showHighlighter(val){
        console.log("huh");
        this.setState({highlight: val});
    }

    render(){
        const {grid, mouseIsPressed, curr_player, room_full,Id, log_message, player1Time, player2Time} = this.state;

        return (
            <>
            <HeadingNav gameRunning = {this.state.gameRunning}
                        quitGame = {this.quitGame}/>
            <div class = "container-fluid">
            <div class="row">
                <div class = "col-sm-9" class = "col-md-9" class="col-lg-9">
                <button onMouseEnter={() => this.showHighlighter(1)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,0)}>
                        Rotate-A
                    </button>
                    <button onMouseEnter={() => this.showHighlighter(2)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,1)}>
                        Rotate-B
                    </button>
                    <button onMouseEnter={() => this.showHighlighter(3)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5 mt-2" onClick = {() => this.rotate(0,2)}>
                        Rotate-C
                    </button>
                    <div className="grid">
                        <>
                        <div class="highlightGrid"><div class={"highlighter board"+(this.state.highlight)}></div></div>
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
                            
                        </>
                    </div>
                    
                    <button onMouseEnter={() => this.showHighlighter(4)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,0)}>
                        Rotate-D
                    </button>
                    <button onMouseEnter={() => this.showHighlighter(5)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,1)}>
                        Rotate-E
                    </button>
                    <button onMouseEnter={() => this.showHighlighter(6)} onMouseLeave={() => this.showHighlighter(0)} type="button" class="btn btn-info btn-sm ml-5 mr-5" onClick = {() => this.rotate(1,2)}>
                        Rotate-F
                    </button>
                </div>
                {this.state.gameRunning
                ? <GameInfo   curr_player = {curr_player}
                                my_color = {this.user}
                                me_ready = {this.me_ready}
                                opp_ready = {this.opp_ready}
                                room_full = {room_full}
                                roomId = {Id}
                                runningSamePc = {this.state.runningSamePc}
                                
                                log_message = {log_message}
                                player1Time = {player1Time}
                                player2Time = {player2Time}
                                playerReady = {() => this.playerReady()}
                                timeOver = {() => this.timeOver()}
                                quitGame = {() => this.quitGame()}
                                endGame = {(reason) => this.endGame(reason)}
                                 />
                : <OutsideGame startSamePC={this.startSamePC} 
                                joinRoom={(roomId)=>this.joinRoom(roomId)} 
                                startNewRoom={(timeLimitEntered)=>this.startNewRoom(timeLimitEntered)} />}
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

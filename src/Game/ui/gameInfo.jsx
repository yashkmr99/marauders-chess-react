import React, { Component } from 'react';
import './ui.css';
import Clock from '../clock/Timer';
import blackbg from '../../static/blackbg.png';
import whitebg from '../../static/whitebg.jpg';

class GameInfo extends Component {
    render(){
        const curr_player_var = this.props.curr_player;
        return (
            <div class="col-sm-2" class="col-md-2" class="col-lg-2">
                <div class="card profile-card-1">
    		        {/* <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg" alt="profile-sample1" class="background"/> */}
    		        {curr_player_var == 2 
                    ? <img src={blackbg} alt="profile-image" class="profile"/>
                    : <img src={whitebg} alt="profile-image" class="profile2"/>
                    }
                    <div class="card-content">
                    <h5 class="font-weight-bold">Current Player: {this.props.curr_player}</h5>
                    <h6>Player 1: <Clock time={this.props.player1Time} timeOver= {() => {clearInterval(this.props.intervalID);}} /></h6>
                    <h6>Player 2: <Clock time={this.props.player2Time} timeOver= {() => {clearInterval(this.props.intervalID);}} /></h6>
                    <p>Log: {this.props.log_message}</p>
                    </div>
                </div>
                {/* <div>
                    <h4>Player 1: <Clock time={this.props.player1Time} timeOver= {() => {clearInterval(this.props.intervalID);}} /></h4>
                    <h4>Player 2: <Clock time={this.props.player2Time} timeOver= {() => {clearInterval(this.props.intervalID);}} /></h4>
                </div>
                <div><h2>Current player: {this.props.curr_player}</h2>
                    <p>Log: {this.props.log_message}</p>
                </div> */}
            </div>
        )
    }
}

export default GameInfo;
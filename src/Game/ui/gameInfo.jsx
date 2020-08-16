import React, { Component } from 'react';
import './ui.css';
import Clock from '../clock/Timer';
import blackbg from '../../static/blackbg.png';
import whitebg from '../../static/whitebg.jpg';

class GameInfo extends Component {
    render(){
        const curr_player_var = this.props.curr_player;

        return (
            <div class="col-sm-3" class="col-md-3" class="col-lg-3" class ="mx-auto">
                {curr_player_var === 1
                ? <><div class="rounded bg-gradient-1 text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2">
                    <p class="mb-2 font-weight-bold text-uppercase">Player 1</p>
                    <div id="clock-b" class="countdown-circles d-flex flex-wrap justify-content-center pt-4">
                    <Clock time={this.props.player1Time} timeOver= {() => this.props.timeOver()} />
                    </div>
                    </div>
                    <div class="rounded bg-blank text-white shadow p-3 pl-5 pr-5 text-center mb-2">
                        <p class="mb-2 font-weight-bold text-uppercase">Player 2</p>
                        <div id="clock-b" class="countdown-circles d-flex flex-wrap justify-content-center pt-4">
                        <Clock time={this.props.player2Time} timeOver= {() => this.props.timeOver()} />
                        </div>
                    </div></>
                : <><div class="rounded bg-blank text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2">
                    <p class="mb-2 font-weight-bold text-uppercase">Player 1</p>
                    <div id="clock-b" class="countdown-circles d-flex flex-wrap justify-content-center pt-4">
                    <Clock time={this.props.player1Time} timeOver= {() => this.props.timeOver()} />
                    </div>
                    </div>
                    <div class="rounded bg-gradient-2 text-white shadow p-3 pl-5 pr-5 text-center mb-2">
                        <p class="mb-2 font-weight-bold text-uppercase">Player 2</p>
                        <div id="clock-b" class="countdown-circles d-flex flex-wrap justify-content-center pt-4">
                        <Clock time={this.props.player2Time} timeOver= {() => this.props.timeOver()} />
                        </div>
                    </div></>
                }
                <div class="card profile-card-1">
    		        {/* <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg" alt="profile-sample1" class="background"/> */}
                    <h5 class="font-weight-bold" >Game Room Id: </h5>

                    <h5 class="font-weight-bold" >You are playing as </h5>
                    <div class="card-content">
                        <h5 class="font-weight-bold">{this.props.curr_player}</h5>
                        <p class="mb-0 font-weight-bold text-uppercase">Log:
                        <br></br>
                        {this.props.log_message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameInfo;
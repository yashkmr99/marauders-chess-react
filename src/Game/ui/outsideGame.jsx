import React, { Component } from 'react';

class OutsideGame extends Component {
    constructor(props){
        super(props);
        this.state = {roomIdEntered: '', timeLimitEntered: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
    }

    handleChange(event) {    this.setState({roomIdEntered: event.target.value});  }

    handleChangeTime(event){
        let valEnt = event.target.value;
        if(!Number(valEnt)){
            return;
        }
        this.setState({timeLimitEntered: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.roomIdEntered);
        event.preventDefault();
    }

    startNewRoom(){

    }

    render(){

        return (
        <>  
        <div class="col-sm-3" class="col-md-3" class="col-lg-3" class ="mx-auto">

            <form class="mt-3">
                <label>
                Enter time limit (minutes):
                <br></br>
                <input type="text" value={this.state.timeLimitEntered} onChange={this.handleChangeTime}/>    </label>
                <br></br>
                {/* <input type="submit" value="Join" /> */}
            </form>
            
            <p class = "h5 font-weight-bold">Same PC</p>
            <button type="button" class="btn btn-secondary btn-sm ml-5 mr-5 mb-5" onClick = {() => this.props.startSamePC(this.state.timeLimitEntered)}>
                        Start
            </button>
            <p class = "h5 font-weight-bold">Different PC</p>
            <button type="button" class="btn btn-secondary btn-sm ml-5 mr-5" onClick = {() => this.startNewRoom()}>
                        Create Room
            </button>
            <form class="mt-3" onSubmit={this.handleSubmit}>
                <label>
                Or enter Room ID:
                <br></br>
                <input type="text" value={this.state.roomIdEntered}  onChange={this.handleChange}/>    </label>
                <br></br>
                <input type="submit" value="Join" />
            </form>
            </div>
        </>
        );
    }
}

export default OutsideGame;
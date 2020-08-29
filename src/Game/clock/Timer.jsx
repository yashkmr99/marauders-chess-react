import React, {Component} from 'react';


function parseTime(time){
    let seconds = parseInt((time % 60), 10);
    let minutes = parseInt((time / 60), 10);

    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
  
    return [minutes, seconds];
};


export default class Clock extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.time >= 0;
    }

    render() {
        const [minutes, seconds] = parseTime(this.props.time);
        return (
            <>
            <div class="holder m-2"><span class="h2 font-weight-bold">{minutes}</span> Min</div>
            <div class="holder m-2"><span class="h2 font-weight-bold">{seconds}</span> Sec</div>
            </>
        );
    }
}
    
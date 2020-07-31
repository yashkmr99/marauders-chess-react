import React, {Component} from 'react';


function parseTime(time){
    let seconds = parseInt((time % 60), 10);
    let minutes = parseInt((time / 60), 10);

    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
  
    return `${minutes}:${seconds}`;
};


export default class Clock extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.time >= 0;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.time <= 0) {
            this.props.timeOver();
        }
    }


    render() {
        const time = parseTime(this.props.time);
        return <div>{time}</div>;
    }
}
    
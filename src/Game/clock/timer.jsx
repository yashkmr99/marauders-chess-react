import React, { Component } from 'react';


export const parseTime = (miliseconds) => {
    const tenthSecond = parseInt((miliseconds / 100) % 6, 10);
    let seconds = parseInt((miliseconds / 1000) % 60, 10);
    let minutes = parseInt((miliseconds / (1000 * 60)), 10 % 60);
    let hours = parseInt((miliseconds / (1000 * 60 * 60)), 10 % 24);
  
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
  
    return `${hours}:${minutes}:${seconds}:${tenthSecond}`;
  };
  
export default class Clock extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.time >= 0;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.time <= 0) {
        this.props.timeOverAction();
        }
    }

    render() {
        const time = parseTime(this.props.time);
        return <div>{time}</div>;
    }
}
    
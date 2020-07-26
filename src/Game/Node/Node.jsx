import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {
    render() {
        const {
            row,
            col,
            isLeft,
            isRight,
            isBottom,
            isTop,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        const extraClassName = isLeft
         ? 'node-left'
         : isRight? 'node-right'
         : isBottom ? 'node-bottom'
         : isTop ? 'node-top'
         : '';

        return (
            <div
                id = {`node-${row}-${col}`}
                className = {`node ${extraClassName}`}
                onMouseDown = {() => onMouseDown(row, col)}
                onMouseEnter = {() => onMouseEnter(row, col)}
                onMouseUp = {() => onMouseUp()}
            ></div>
        );
    }
}
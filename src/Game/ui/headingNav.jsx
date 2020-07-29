import React, { Component } from 'react';
import './ui.css';

class HeadingNav extends Component {
    render(){
        return (
            <div>
                <div class= "header">The Marauders' Chess</div>
                <div class="topnav">
                    <a href="#">New Game</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </div>
            </div>
        )
    }
}

export default HeadingNav;
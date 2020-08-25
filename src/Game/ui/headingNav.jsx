import React, { Component } from 'react';
import './ui.css';
import {Modal, Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Game from '../Game.jsx';

class HeadingNav extends Component {
	constructor(props){
		super(props);
	}

    render(){
        return (
            <div>
                <div class= "header">
                    <div class = "header-limiter">
                    <h1>Marauders' <span>Chess</span></h1>
                    <nav>
                        {/* <a href="#">New Game</a>
                        <a href="#" class="selected">Blog</a>
                        <a href="#">Rules</a>
                        <a href="#">About</a> */}
                        {/* <button>New Game</button>
                        <button>Rules</button>
                        <button>About</button> */}
                        <RulesModal/>
                        <AboutModal/>
                    </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadingNav;


class AboutModal extends Component {
    
    constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		return (
			<>
				<Button variant="primary" onClick={this.handleShow}>
					About
                </Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Marauders' Chess</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <p>A chess variant built using ReactJS</p>
                        <p class="h5" class="font-weight-bold"><a href="https://github.com/yashkmr99/marauders-chess-react"  target="_blank">Github Link</a></p>
                        <h4 class="font-weight-bold">Contributors</h4>
                        <p class="h3" class="font-weight-bold">
                            Yash Kumar <a href = "https://github.com/yashkmr99" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Suhas Prabhandam <a href = "https://github.com/Suhas1998" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Prathik S Nayak <a href = "https://github.com/PSN221B" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            
                        </p>
                    </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
                        </Button>
						{/* <Button variant="primary" onClick={this.handleClose}>
							Save Changes
                        </Button> */}
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}



class RulesModal extends Component {
    
    constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		return (
			<>
				<Button variant="primary" onClick={this.handleShow}>
					Rules
                </Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Rules</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval= "false" data-wrap="false">
							<div class="carousel-inner">
								<div class="carousel-item active">
									<h3>Basic Instructions</h3>
									<ul>
										<li>Marauders Chess is a strategic game, where the players play against each other with an objective to kill the opponent’s King passing through various mazes.</li>
										<li>The Main Board consists of 6 smaller rotatable boards, each having a 5x5 maze with some walls restricting the movement of the pieces.</li>
										<li>In each turn, a player can choose to either move one of his pieces or rotate one of the 6 boards (Clockwise).</li>
										<li>The game ends if one of the player kills the opponents King or the time of one of the players completely drains out.</li>
									</ul>
								</div>
								<div class="carousel-item">
									<h3>Valid Moves of Pieces</h3>
									<ul>
										<li>All the moves of the pieces are same as traditional chess pieces.</li>
										<li>A Rook, King and Bishop can not move if a wall is blocking in its direction of movement where as a Knight has the ability to cross atmost 1 wall in their movement.</li>
										<li>The move of a Knight is considered as two steps in one direction and then one step in perpendicular direction forming a L shape. Thus, this path is considered while checking the number of blocking walls in the path.</li>
									</ul>
								</div>
								<div class="carousel-item">
									<p>Text 3</p>
								</div>
							</div>
							<a class="carousel-control-prev carousel-color" href="#carouselExampleControls" role="button" data-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="carousel-control-next carousel-color" href="#carouselExampleControls" role="button" data-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
                    </Modal.Body>
				</Modal>
			</>
		);
	}
}


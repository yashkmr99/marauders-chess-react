import React, { Component } from 'react';
import './ui.css';
import {Modal, Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

class HeadingNav extends Component {
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
                            Yash Kumar <a href = "https://github.com/yashkmr99"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Suhas Prabhandam <a href = "https://github.com/Suhas1998"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Prathik S Nayak <a href = "https://github.com/PSN221B"><i class = "fa fa-github"></i></a>
                            
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
                        <p>
                            Write rules over here.
                        </p>
                    </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
                        </Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
import React, { Component } from "react";
import "./ui.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from "../Game.jsx";
import knight_move from "../../static/knight_move.png";
import bishop_move from "../../static/bishop_move.png";
import yash_img from "../../static/yash.jpg";
import prateek_img from "../../static/prateek.jpg";
import suhas_img from "../../static/suhas.jpg";

class HeadingNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="header">
          <div class="header-limiter">
            <h1>
              Marauders' <span>Chess</span>
            </h1>
            <nav>
              {/* <a href="#">New Game</a>
                        <a href="#" class="selected">Blog</a>
                        <a href="#">Rules</a>
                        <a href="#">About</a> */}
              {/* <button>New Game</button>
                        <button>Rules</button>
                        <button>About</button> */}
              <RulesModal />
              <AboutModal />
            </nav>
          </div>
        </div>
      </div>
    );
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
            <h1 class="font-weight-bold text-center">Contributors</h1>
            {/* <p class="h3" class="font-weight-bold">
                            Yash Kumar <a href = "https://github.com/yashkmr99" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Suhas Prabhandam <a href = "https://github.com/Suhas1998" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            <br></br>
                            Prathik S Nayak <a href = "https://github.com/PSN221B" target="_blank" rel="noopener noreferrer"><i class = "fa fa-github"></i></a>
                            
                        </p> */}
            <div class="d-flex justify-content-around">
              <div class="profile-card-2">
                <img src={prateek_img} alt="Person" class="card__image"></img>
                <p class="card__name">Prathik S Nayak</p>
                <ul class="social-icons">
                  <li>
                    <a
                      href="https://www.facebook.com/prathik.nayak.8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/PSN221B"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-github"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/prathik-s-nayak/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="profile-card-2">
                <img src={suhas_img} alt="Person" class="card__image"></img>
                <p class="card__name">P. Suhas</p>
                <ul class="social-icons">
                  <li>
                    <a
                      href="https://www.facebook.com/prabhandam.suhas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Suhas1998"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-github"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/suhas23/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="profile-card-2">
                <img src={yash_img} alt="Person" class="card__image"></img>
                <p class="card__name">Yash Kumar</p>
                <ul class="social-icons">
                  <li>
                    <a
                      href="https://www.facebook.com/yashkmr99"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yashkmr99"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-github"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/yashkmr99/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div class="justify-content-center d-flex github-footer">
              <a
                class="btn btn-dark"
                href="https://github.com/yashkmr99/marauders-chess-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-github fa-2x"></i>
                <span class="icon_text">
                  Show your love by giving a Star to our Github Repository
                </span>
              </a>
            </div>
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
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-ride="carousel"
              data-interval="false"
              data-wrap="false"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <h3>Basic Instructions</h3>
                  <ul>
                    <li>
                      Marauders Chess is a strategic game, where the players
                      play against each other with an objective to kill the
                      opponent’s King passing through various mazes.
                    </li>
                    <li>
                      The Main Board consists of 6 smaller rotatable boards,
                      each having a 5x5 maze with some walls restricting the
                      movement of the pieces.
                    </li>
                    <li>
                      In each turn, a player can choose to either move one of
                      his pieces or rotate one of the 6 boards (Clockwise).
                    </li>
                    <li>
                      The game ends if one of the player kills the opponents
                      King or the time of one of the players completely drains
                      out.
                    </li>
                  </ul>
                </div>
                <div class="carousel-item">
                  <h3>Valid Moves of Pieces</h3>
                  <ul>
                    <li>
                      All the moves of the pieces are same as traditional chess
                      pieces.
                    </li>
                    <li>
                      A Rook, King and Bishop can not move if a wall is blocking
                      in its direction of movement where as a Knight has the
                      ability to cross atmost 1 wall in their movement.
                    </li>
                    <li>
                      The move of a Knight is considered as two steps in one
                      direction and then one step in perpendicular direction
                      forming a L shape. Thus, this path is considered while
                      checking the number of blocking walls in the path. (A is
                      valid but B is not.)
                    </li>
                  </ul>
                  <img src={knight_move} class="center"></img>
                </div>
                <div class="carousel-item">
                  <h3>Movement of Bishop:</h3>
                  <ul>
                    <li>
                      The bishop cannot cross a cornered wall as shown in move
                      C.
                    </li>
                    <li>
                      The bishop can however cross a single wall from the edge
                      as shown in move A or B.
                    </li>
                  </ul>
                  <img src={bishop_move} class="center"></img>
                </div>
                <div class="carousel-item">
                  <h3>How to play:</h3>
                  <ul>
                    <li>
                      To initiate a move, select the piece and then select the
                      destination cell. The piece can be moved only if it is its
                      valid movement and no other piece or wall is blocking its
                      way.
                    </li>
                    <li>
                      To rotate a board, just click on the respective Rotate
                      button next to that board.
                    </li>
                    <li>
                      Pay attention to the log message at the bottom-right of
                      the screen for the match updates.
                    </li>
                  </ul>
                </div>
              </div>
              <a
                class="carousel-control-prev carousel-color"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next carousel-color"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

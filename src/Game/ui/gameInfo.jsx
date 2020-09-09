import React, { Component } from "react";
import "./ui.css";
import { Modal, Button, ModalBody } from "react-bootstrap";
import Clock from "../clock/Timer";
import blackbg from "../../static/blackbg.png";
import whitebg from "../../static/whitebg.jpg";
import myProfile from "../../static/myProfile.png";
import oppProfile from "../../static/oppProfile.png";
import inactive from "../../static/inactive.png";
import mydialog from "../../static/my_dialog.png";
import oppdialog from "../../static/opp_dialog.png";

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.handleQuitGame = this.handleQuitGame.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleRematch = this.handleRematch.bind(this);
  }

  handleQuitGame() {
    this.props.quitGame();
  }

  handleRematch() {
    this.props.endGame(0);
  }

  handleStartGame() {
    this.props.playerReady();
  }

  render() {
    const curr_player_var = this.props.curr_player;
    const roomId = this.props.roomId;
    const player_color = this.props.my_color;
    const opp_present = this.props.room_full == 2 ? 1 : 0;
    const winner_color = this.props.winner_color;
    const me_ready = this.props.me_ready;
    const opp_ready = this.props.opp_ready;

    return (
      <>
        {!this.props.runningSamePc ? (
          // If we are playing using sockets
          <>
            <div
              class="col-sm-3"
              class="col-md-3"
              class="col-lg-3"
              class="mx-auto"
            >
              <div class="btn-menu mt-2">
                <button
                  type="button"
                  class="btn btn-warning btn-lg "
                  onClick={this.handleRematch}
                >
                  New Game
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-lg "
                  onClick={this.handleQuitGame}
                >
                  Quit Room
                </button>
              </div>
              <div
                class={
                  "rounded text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2 " +
                  (player_color === 1
                    ? curr_player_var === 1
                      ? "bg-green"
                      : "bg-red"
                    : "bg-opponent")
                }
              >
                <p class="mb-2 font-weight-bold text-uppercase">
                  {player_color === 1
                    ? curr_player_var === 1
                      ? "Play Your Turn"
                      : "Wait for your Turn"
                    : curr_player_var === 1
                    ? "Opponent is Playing"
                    : "Opponent is Waiting"}
                </p>
                <div
                  id="clock-b"
                  class="countdown-circles d-flex flex-wrap justify-content-center pt-4"
                >
                  <Clock
                    time={this.props.player1Time}
                    timeOver={() => this.props.timeOver()}
                  />
                </div>
              </div>
              <div
                class={
                  "rounded text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2 " +
                  (player_color === 2
                    ? curr_player_var === 2
                      ? "bg-green"
                      : "bg-red"
                    : "bg-opponent")
                }
              >
                <p class="mb-2 font-weight-bold text-uppercase">
                  {player_color === 2
                    ? curr_player_var === 2
                      ? "Play Your Turn"
                      : "Wait for your Turn"
                    : curr_player_var === 2
                    ? "Opponent is Playing"
                    : "Opponent is Waiting"}
                </p>
                <div
                  id="clock-b"
                  class="countdown-circles d-flex flex-wrap justify-content-center pt-4"
                >
                  <Clock
                    time={this.props.player2Time}
                    timeOver={() => this.props.timeOver()}
                  />
                </div>
              </div>
              <div class="card">
                {/* <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg" alt="profile-sample1" class="background"/> */}
                <h5 class="font-weight-bold">Game Room Id: {roomId} </h5>
                <h5 class="font-weight-bold">
                  You are playing as : {player_color === 1 ? "White" : "Black"}{" "}
                </h5>
              </div>
              <div class="card profile-card-1 bg-blue">
                <p class="mb-0 font-weight-bold text-uppercase">
                  Log:
                  <br></br>
                  {this.props.log_message}
                </p>
              </div>
            </div>
            <Modal show={this.props.curr_player === 0}>
              <Modal.Header>
                <Modal.Title>Game Waiting Room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h1 class="text-center">Room Id: {roomId}</h1>
                  {winner_color === 0 ? (
                    <></>
                  ) : (
                    <h1 class="text-center">
                      {winner_color === player_color
                        ? "You are "
                        : "Opponent is "}
                      the Winner!
                    </h1>
                  )}
                  <div class="player-cards">
                    <div class="card border-0">
                      <img class="card-img-top" src={myProfile}></img>
                      {me_ready === 1 ? (
                        <img class="img-dialog-left" src={mydialog}></img>
                      ) : (
                        <></>
                      )}
                      <div class="card-body">
                        <h1 class="card-title">You</h1>
                      </div>
                    </div>
                    <div class="vs">
                      <h1>Vs</h1>
                    </div>
                    <div class="card border-0">
                      <img
                        class="card-img-top"
                        src={this.props.room_full === 2 ? oppProfile : inactive}
                      ></img>
                      {opp_ready === 1 ? (
                        <img class="img-dialog-right" src={oppdialog}></img>
                      ) : (
                        <></>
                      )}
                      <div class="card-body">
                        <h1 class="card-title">Opponent</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {opp_present ? (
                  <Button variant="secondary" onClick={this.handleStartGame}>
                    Start New Game
                  </Button>
                ) : (
                  <Button variant="secondary">Wait for Opponent</Button>
                )}
                <Button variant="secondary" onClick={this.handleQuitGame}>
                  Quit Room
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          // If game played is on same PC (without sockets)
          <div
            class="col-sm-3"
            class="col-md-3"
            class="col-lg-3"
            class="mx-auto"
          >
            <div class="btn-menu mt-2">
              <button
                type="button"
                class="btn btn-danger btn-md "
                onClick={this.handleQuitGame}
              >
                Quit Game
              </button>
            </div>
            <div
              class={
                "rounded text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2 " +
                (player_color === 1
                  ? curr_player_var === 1
                    ? "bg-green"
                    : "bg-red"
                  : "bg-opponent")
              }
            >
              <p class="mb-2 font-weight-bold text-uppercase">
                {" "}
                Player 1 : White{" "}
              </p>
              <div
                id="clock-b"
                class="countdown-circles d-flex flex-wrap justify-content-center pt-4"
              >
                <Clock
                  time={this.props.player1Time}
                  timeOver={() => this.props.timeOver()}
                />
              </div>
            </div>
            <div
              class={
                "rounded text-white shadow mt-2 p-3 pl-6 pr-6 text-center mb-2 " +
                (player_color === 2
                  ? curr_player_var === 2
                    ? "bg-green"
                    : "bg-red"
                  : "bg-opponent")
              }
            >
              <p class="mb-2 font-weight-bold text-uppercase">
                {" "}
                Player 2 : Black{" "}
              </p>
              <div
                id="clock-b"
                class="countdown-circles d-flex flex-wrap justify-content-center pt-4"
              >
                <Clock
                  time={this.props.player2Time}
                  timeOver={() => this.props.timeOver()}
                />
              </div>
            </div>
            <div class="card">
              {/* <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg" alt="profile-sample1" class="background"/> */}
              <h5 class="font-weight-bold">Game Room Id: - </h5>
              <h5 class="font-weight-bold">
                Current Player : {curr_player_var === 1 ? "White" : "Black"}{" "}
              </h5>
            </div>
            <div class="card profile-card-1 bg-blue">
              <p class="mb-0 font-weight-bold text-uppercase">
                Log:
                <br></br>
                {this.props.log_message}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default GameInfo;

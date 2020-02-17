import React, { Component } from 'react'

class Game extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            gameBoard: [],

            player1: 1,
            player2: 2,

            currentPlayer: null,

            gameOver: false,
            message: '',
            playerTurn: ''
        }
    }

    componentDidMount() {
        // Rita board!
        let board = [];

        for (let rows = 0; rows < 6; rows++) {
            let row = [];

            for (let column = 0; column < 7; column++) row.push(null);
            board.push(row);
        }

        this.setState({
            gameBoard: board,
            currentPlayer: this.state.player1,
            gameOver: false,
            message: '',
            playerTurn: ''
        })
    }

    changePlayer() {
        const { currentPlayer, player1, player2 } = this.state;

        return currentPlayer === player1 ? this.setState({ playerTurn: 'Player2 turn!' }) || player2 : this.setState({ playerTurn: 'Player1 turn!' }) || player1;
    }

    // playGame(index) {

    // }


    render() {
        const { gameBoard, message, playerTurn } = this.state;

        return (
            <div>
                {/* <button onClick={() => this.startGame()}>New game</button> */}

                <table>
                    <thead></thead>
                    <tbody>
                        {gameBoard.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map((cell, i) => {

                                        return (
                                            <>
                                            <td key={i}>
                                                <div className="box" onClick={() => this.play(i)}></div>
                                            </td>
                                            </>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p>{playerTurn}</p>
                <p>{message}</p>
            </div>
        )
    }
}

export default Game

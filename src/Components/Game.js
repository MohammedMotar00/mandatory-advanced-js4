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

    startGame() {
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

    playGame(index) {
        const { gameBoard, currentPlayer, gameOver } = this.state;

        // ifall inte gameOver, alltså, om spelet är fortfarande igång och ingen har vunnit eller oavgjort!
        if (!gameOver) {
            // Kunna placera saker på min board!
            let board = gameBoard;

            for (let row = 5; row >= 0; row--) {
                if (!board[row][index]) {
                    board[row][index] = currentPlayer;
                    break;      // om jag inte skriver break, så kommer den fylla hela min kolumn bara jag klickar en gång!
                }
            }

            this.setState({ currentPlayer: this.changePlayer() });            
        }
    }


    render() {
        const { gameBoard, message, playerTurn } = this.state;

        return (
            <div>
                <button onClick={() => this.startGame()}>New game</button>

                <table>
                    <thead></thead>
                    <tbody>
                        {gameBoard.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map((value, i) => {

                                        let color = 'white';
                                        if (value === 1) {
                                            color = 'red';
                                        } else if (value === 2) {
                                            color = 'yellow';
                                        }

                                        return (
                                            <>
                                            <td key={i}>
                                                <div className="box" onClick={() => this.playGame(i)}>
                                                    <div className={color}></div>
                                                </div>
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

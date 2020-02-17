import React, { Component } from 'react'
import '../App.css';

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
        const { gameBoard, currentPlayer, gameOver, player1, player2 } = this.state;

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

            // checka min board resultat!
        let checkResult = this.checkAllWaysToWin(board);

        if (checkResult === player1 ) {
            this.setState({ gameOver: true, message: 'Player1 Won!', playerTurn: '' });
        }
        else if (checkResult === player2) {
            this.setState({ gameOver: true, message: 'Player2 Won', playerTurn: '' });
        }
        else if (checkResult !== player1 && checkResult !== player2 && checkResult !== 'draw') {    // skriv bara else
            this.setState({ currentPlayer: this.changePlayer() });
        }
        }
        else {
            this.setState({ message: 'Game over, restart game!' })
        }
        }

    checkVertical(board) {
        // Check only if row is 3 or greater
        for (let r = 3; r < 6; r++) {   // jag räknar med index --> alltså  -->  0, 1, 2, 3, 4, 5, 6
        for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c] &&
                board[r][c] === board[r - 2][c] &&
                board[r][c] === board[r - 3][c]) {
                return board[r][c];    
            }
            }
        }
        }
    }
    

    // denna funktionen kommer ta in alla sätt man kan vinna sen checka i playGame funcktionen vem som har vunnit, alltså om det är Player1 som har vunnit eller Player 2
    checkAllWaysToWin(board) {
        return this.checkVertical(board);
    }

    componentWillUnmount() {
        this.startGame();
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
                                    {row.map((box, i) => {

                                        let color = 'white';
                                        if (box === 1) {
                                            color = 'red';
                                        } else if (box === 2) {
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

import React, { Component } from 'react'
import '../App.css';
import { Helmet } from 'react-helmet';

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
            playerTurn: '',
            columnFull: ''
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

            // jag vill skapa här en drop, 
            // alltså om min column är full, 
            // så ska jag inte kunna fortsätta byta spelare, 
            // utan bara kunna byta spelare när det finns en tom yta!
            let drop = false;

            for (let row = 5; row >= 0; row--) {
                if (!board[row][index]) {
                    board[row][index] = currentPlayer;
                    drop = true;
                    break;      // om jag inte skriver break, så kommer den fylla hela min kolumn bara jag klickar en gång!
                }
            }

            // if (!drop) return;
            if (!drop) {
                this.setState({ columnFull: 'There is no free space in this column! Please try another column!' });
                return
            }
            else {
                this.setState({ columnFull: '' });
            }

        // checka min board resultat!
        let checkResult = this.checkAllWaysToWin(board);

        if (checkResult === player1 ) {
            this.setState({ gameOver: true, message: 'Player1 Won!', playerTurn: '' });
        }
        else if (checkResult === player2) {
            this.setState({ gameOver: true, message: 'Player2 Won', playerTurn: '' });
        }
        else if (checkResult === 'Game-Draw') {
            this.setState({ gameOver: true, message: 'The game is draw!', playerTurn: '' });
        }
        else if (checkResult !== player1 && checkResult !== player2 && checkResult !== 'Game-Draw') {    // kan bara skriva direkt else istället för else if, men jag tycker de ser fint ut så :)
            this.setState({ currentPlayer: this.changePlayer() });
        }
        }
        else {
            this.setState({ message: 'Game over, restart game!' })
        }
        }

    checkVerticalWay(board) {
        // Checkar bara om row är 3 eller större!
        for (let r = 3; r < 6; r++) {
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

    checkHorizontalWay(board) {
        // Checkar bara om kolumn är 3 eller mindre
        for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r][c + 1] && 
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
                return board[r][c];
            }
            }
        }
        }
    }
    
    checkDiagonalRight(board) {
        // Checkar ifall row är 3 eller större och ifall column är 3 eller mindre
        for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r][c] === board[r - 2][c + 2] &&
                board[r][c] === board[r - 3][c + 3]) {
                return board[r][c];
            }
            }
        }
        }
    }

    checkDiagonalLeft(board) {
        // Checkar ifall row är 3 eller större och kolumn 3 eller större!
        for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c - 1] &&
                board[r][c] === board[r - 2][c - 2] &&
                board[r][c] === board[r - 3][c - 3]) {
                return board[r][c];
            }
            }
        }
        }
    }

    checkDraw(board) {
        //  vi checkar här för draw!
        for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c] === null) {
            return null;
            }
        }
        }
        return 'Game-Draw';    
    }


    // denna funktionen kommer ta in alla sätt man kan vinna sen checka i playGame funcktionen vem som har vunnit, alltså om det är Player1 som har vunnit eller Player 2
    checkAllWaysToWin(board) {
        return this.checkVerticalWay(board) || this.checkHorizontalWay(board) || this.checkDiagonalLeft(board) || this.checkDiagonalRight(board) || this.checkDraw(board);
    }

    componentWillUnmount() {
        this.startGame();
    }


    render() {
        const { gameBoard, message, playerTurn, columnFull } = this.state;

        return (
            <div>
                <Helmet>
                    <title>Connected 4 Game</title>
                </Helmet>

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
                                                <div key={i} className="box" onClick={() => this.playGame(i)}>
                                                    <div key={i} className={color}></div>
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

                <div className="message-container">
                    <p style={{ color: 'blue' }}>{playerTurn}</p>
                    <p style={{ color: 'red' }}>{columnFull}</p>
                    <p style={{ color: 'green' }}>{message}</p>
                </div>
            </div>
        )
    }
}

export default Game

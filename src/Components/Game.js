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
        const {} = this.state;
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Game

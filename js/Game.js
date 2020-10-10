class Game{

    // Constructor
    constructor(){
        this.inProgress = true; // Game progress, false if the game has ended
        this.winPlayer = null;  // Winning player ("O" or "X")
        this.currentPlayer = Game.O;    // Current player ("O" or "X")
        this.moveCount = 0; // Move count
        this.squares = new Array(9).fill().map( s => new Sqaure() );  // Array of squares in the grid
    }

    // Add either "O" or "X" into index i of array squares
    move(i) {

        // Check if the game is in progress and the square is not filled
        if(this.inProgress && !this.squares[i].value){
            
            // Add the value into the square
            this.squares[i].value = this.currentPlayer;

            // Increse move count by 1
            this.moveCount++;

            // Check for the winner
            this.checkWinner();

            // Switch the player for the next turn
            this.currentPlayer = (this.currentPlayer === Game.O) ? Game.X : Game.O;

        }

    }

    // Check if the current player fulfills the win condition
    checkWinner(){

        // Possible winning combinations
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        // Loop through the array winConditions and check if any conditions has been fulfilled
        winConditions.forEach((w) =>{

            let squareA = this.squares[w[0]];
            let squareB = this.squares[w[1]];
            let squareC = this.squares[w[2]];

            // Check if square A is filled and have the same value as square B and square C
            if((squareA.value) && (squareA.value === squareB.value) && (squareA.value === squareC.value)){

                // End the current game
                this.inProgress = false;

                // Declare the winner
                this.winPlayer = squareA.value;

                // Highlight the value in the winning row
                squareA.isHighlighted = true;
                squareB.isHighlighted = true;
                squareC.isHighlighted = true;
            }

        });

        // If all the squares have been filled and there is no winner, the game is drawn
        if(this.moveCount == this.squares.length){
            this.inProgress = false;
        }

    }

}

Game.O = "O";
Game.X = "X";
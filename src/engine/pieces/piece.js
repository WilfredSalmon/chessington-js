import Square from "../square";

export default class Piece {
    constructor(player,type) {
        this.player = player;
        this.hasNotMoved = true;
        this.type = type
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    getAvailableMovesFromDirections(dirs,currentSquare,board) {
        const allowedMoves = [];

        for(let i=0; i<dirs.length; i++) {
            const rowDirection = dirs[i][0];
            const colDirection = dirs[i][1];

            let notBlocked = true;
            let iterateSquare = currentSquare;
            let squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);

            while(board.checkIfValidSquare(squareToAdd) && notBlocked) {
                const statusOfSqaureToAdd = board.checkIfSquarePassable(squareToAdd,this);

                if (statusOfSqaureToAdd.squareOccupied) {
                    notBlocked = false;
                    if (statusOfSqaureToAdd.squarePassable) {
                        allowedMoves.push(squareToAdd);
                    }
                } else {
                    allowedMoves.push(squareToAdd);
                }

                iterateSquare = squareToAdd;
                squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);
            }
        }

        return allowedMoves;
    }

}

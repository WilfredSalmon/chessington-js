import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasNotMoved = true;
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
                if (board.getPiece(squareToAdd) !== undefined) {

                    if (board.getPiece(squareToAdd).player === this.player) {notBlocked = false;}
                    else {
                        allowedMoves.push(squareToAdd);
                        notBlocked = false;
                    }

                } else {allowedMoves.push(squareToAdd);}

                iterateSquare = squareToAdd;
                squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);
            }
        }

        return allowedMoves;
    }
}

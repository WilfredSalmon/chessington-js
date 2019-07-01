import Piece from './piece';
import Square from '../square';


export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const allowedMoves = [];

        const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

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

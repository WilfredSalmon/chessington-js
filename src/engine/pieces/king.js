import Piece from './piece';
import Square from "../square";

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const allowedMoves = [];

        for (let rowAdd = -1; rowAdd<2;rowAdd++) {
            for (let colAdd = -1; colAdd<2;colAdd++) {

                const squareToAdd = Square.at(currentSquare.row + rowAdd, currentSquare.col + colAdd);
                if (board.checkIfValidSquare(squareToAdd) && !currentSquare.equals(squareToAdd)) {
                    allowedMoves.push(squareToAdd);
                }
            }
        }

        return allowedMoves;
    }
}

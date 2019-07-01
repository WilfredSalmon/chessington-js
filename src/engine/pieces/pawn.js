import Piece from './piece';
import Square from '../square';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {

        const currentSquare = board.findPiece(this);
        const allowedMoves = [];

        if (this.player === Player.WHITE) {
            allowedMoves.push(Square.at(currentSquare.row + 1,currentSquare.col));

            if (this.hasNotMoved) {
                allowedMoves.push(Square.at(currentSquare.row + 2,currentSquare.col))
            }
        }
        else {
            allowedMoves.push(Square.at(currentSquare.row - 1,currentSquare.col ));

            if (this.hasNotMoved) {
                allowedMoves.push(Square.at(currentSquare.row - 2,currentSquare.col))
            }
        }

        return allowedMoves;

    }
}

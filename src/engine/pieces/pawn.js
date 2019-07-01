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
        let multiplier = 1;


        if (this.player === Player.BLACK) {
            multiplier = -1;
        }

        const squareToAdd = Square.at(currentSquare.row + multiplier, currentSquare.col);

        if (board.checkIfValidSquare(squareToAdd)) {
            if (board.getPiece(squareToAdd) === undefined) {
                allowedMoves.push(squareToAdd);
            }
        }

        if (this.hasNotMoved) {
            const squareToAdd= Square.at(currentSquare.row + 2*multiplier,currentSquare.col);
            const possibleBlockingSquare = Square.at(currentSquare.row + multiplier, currentSquare.col);

            if (board.checkIfValidSquare(squareToAdd) && board.checkIfValidSquare(possibleBlockingSquare)) {
                if (board.getPiece(squareToAdd) === undefined && board.getPiece(possibleBlockingSquare) === undefined) {
                    allowedMoves.push(squareToAdd);
                }
            }
        }

        return allowedMoves;

    }
}

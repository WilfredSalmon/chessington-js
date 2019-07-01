import Piece from './piece';
import Square from '../square';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player,'Pawn');
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

        for (let colDirection = -1; colDirection<2; colDirection +=2) {
            const squareToAdd = Square.at(currentSquare.row + multiplier, currentSquare.col + colDirection);

            if (board.checkIfValidSquare(squareToAdd)){
                const statusOfSquareToAdd = board.checkIfSquarePassable(squareToAdd,this);
                if(statusOfSquareToAdd.squareOccupied && statusOfSquareToAdd.squarePassable){
                    allowedMoves.push(squareToAdd);
                }
            }
        }

        return allowedMoves;

    }
}

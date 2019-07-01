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


        // Usual move 1 forward
        const squareToAdd = Square.at(currentSquare.row + multiplier, currentSquare.col);

        if (board.checkIfValidSquare(squareToAdd)) {
            if (! board.checkIfSquarePassable(squareToAdd, this).squareOccupied) {
                allowedMoves.push(squareToAdd);
            }
        }

        // If it hasn't moved, move 2 forward
        if (this.hasNotMoved) {
            const squareToAdd= Square.at(currentSquare.row + 2*multiplier,currentSquare.col);
            const possibleBlockingSquare = Square.at(currentSquare.row + multiplier, currentSquare.col);

            if (board.checkIfValidSquare(squareToAdd)) {
                if ( !(board.checkIfSquarePassable(squareToAdd, this).squareOccupied ||  board.checkIfSquarePassable(possibleBlockingSquare, this).squareOccupied) ){
                    allowedMoves.push(squareToAdd);
                }
            }
        }

        //Check diagonal Taking, including en Passant
        for (let colDirection = -1; colDirection<2; colDirection +=2) {
            const squareToAdd = Square.at(currentSquare.row + multiplier, currentSquare.col + colDirection);

            if (board.checkIfValidSquare(squareToAdd)){
                const statusOfSquareToAdd = board.checkIfSquarePassable(squareToAdd,this);

                if(statusOfSquareToAdd.squareOccupied && statusOfSquareToAdd.squarePassable) {allowedMoves.push(squareToAdd);}

                const possibleEnPassantSquare = Square.at(currentSquare.row, currentSquare.col + colDirection);

                if (board.checkIfSquarePassable(possibleEnPassantSquare, this).squareOccupied) {

                    const pieceThere = board.getPiece(possibleEnPassantSquare);
                    if (pieceThere.type === 'Pawn' && pieceThere.player !== this.player && board.lastPieceToMove === pieceThere) {allowedMoves.push(squareToAdd);}
                }
            }

        }

        return allowedMoves;

    }
}

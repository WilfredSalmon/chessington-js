import Piece from './piece';
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player,'Knight');
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const allowedMoves = [];
        let attackingKing = false;

        for (let rowLength = 1; rowLength<3;rowLength++) {

            const colLength = 3 - rowLength;

            for (let rowDirection=-1;rowDirection<2;rowDirection+=2) {
                for (let colDirection=-1;colDirection<2;colDirection+=2) {

                    const squareToAdd = Square.at(currentSquare.row + rowLength*rowDirection,currentSquare.col + colLength*colDirection)

                    if(board.checkIfValidSquare(squareToAdd)) {

                        const statusOfSquareToAdd = board.checkIfSquarePassable(squareToAdd,this);
                        if (statusOfSquareToAdd.squarePassable) {allowedMoves.push(squareToAdd);}
                        if(statusOfSquareToAdd.givesCheck) {attackingKing = true;}

                    }
                }
            }
        }

        return {allowedMoves: allowedMoves, attackingKing: true};
    }
}

import Piece from './piece';
import Square from '../square';


export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const allowedMoves = [];

        for (let rowDirection=-1;rowDirection<2;rowDirection+=2) {
            for (let colDirection=-1;colDirection<2;colDirection+=2) {

                let iterateSquare = currentSquare;

                while (board.checkIfValidSquare(iterateSquare.row + rowDirection,iterateSquare.col + colDirection )) {
                    iterateSquare = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);
                    allowedMoves.push(iterateSquare);
                }
            }
        }

        return allowedMoves;
    }
}

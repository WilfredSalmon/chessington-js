import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);

        const allowedMoves = [];

        for(let i =0; i<GameSettings.BOARD_SIZE;i++) {
            if (i !== currentSquare.row) {
                allowedMoves.push(Square.at(i, currentSquare.col));
            }

            if (i !== currentSquare.col) {
                allowedMoves.push(Square.at(currentSquare.row, i));
            }
        }

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

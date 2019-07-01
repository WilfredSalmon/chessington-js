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
                let squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection );

                while (board.checkIfValidSquare(squareToAdd.row,squareToAdd.col)) {
                    allowedMoves.push(squareToAdd);
                    iterateSquare = squareToAdd;
                    squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection );
                }
            }
        }

        return allowedMoves;
    }


}

import Piece from './piece';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Rook extends Piece {
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

        return allowedMoves;
    }
}

import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        return this.getAvailableMovesFromDirections(dirs,board.findPiece(this),board);
    }
}

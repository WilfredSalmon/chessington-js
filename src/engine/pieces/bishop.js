import Piece from './piece';
import Square from '../square';


export default class Bishop extends Piece {
    constructor(player) {
        super(player,'Bishop');
    }

    getAvailableMoves(board) {
        const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        return this.getAvailableMovesFromDirections(dirs,board.findPiece(this),board);
    }


}

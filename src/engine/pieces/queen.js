import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1, -1], [-1, 1], [1, -1], [1, 1]];
        return this.getAvailableMovesFromDirections(dirs,board.findPiece(this),board);
    }


}

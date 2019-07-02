import Square from "../square";

export default class Piece {

    constructor(player,type) {
        this.player = player;
        this.hasNotMoved = true;
        this.type = type
    }

    getAvailableMoves(board) {
        // See each piece
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    getAvailableMovesFromDirections(dirs,currentSquare,board) {
        const allowedMoves = [];
        let attackingKing = false;

        for(let direction of dirs) {
            const rowDirection = direction[0];
            const colDirection = direction[1];

            let notBlocked = true;
            let iterateSquare = currentSquare;
            let squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);

            while(board.checkIfValidSquare(squareToAdd) && notBlocked) {
                const statusOfSquareToAdd = board.checkIfSquarePassable(squareToAdd,this);

                if (statusOfSquareToAdd.squareOccupied) {
                    notBlocked = false;
                    if (statusOfSquareToAdd.squarePassable) {
                        allowedMoves.push(squareToAdd);
                    }
                } else {
                    allowedMoves.push(squareToAdd);
                }

                if (statusOfSquareToAdd.attackingKing) {
                    attackingKing = true;
                }

                iterateSquare = squareToAdd;
                squareToAdd = Square.at(iterateSquare.row + rowDirection,iterateSquare.col + colDirection);
            }
        }

        return {allowedMoves: allowedMoves, attackingKing: attackingKing};
    }

}

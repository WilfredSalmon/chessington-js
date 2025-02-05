import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';

export default class Board {

    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.lastPieceToMove = null;
        this.whiteInCheck = false;
        this.blackInCheck = false;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);

        if (!!movingPiece && movingPiece.player === this.currentPlayer) {

            if (this.checkIfMoveGivesCheck(movingPiece, fromSquare, toSquare, this)) {
                console.log("Move Gives Check")
            }

            if (movingPiece.type === TYPES.PAWN && !this.checkIfSquarePassable(toSquare,movingPiece).squareOccupied && toSquare.col !== fromSquare.col) {
                this.setPiece(Square.at(fromSquare.row,toSquare.col), undefined);
                console.log(`deleting piece at ${Square.at(fromSquare.row,toSquare.col).toString()}`);
            }

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }

        movingPiece.hasNotMoved = false;
        this.lastPieceToMove = movingPiece;

    }

    checkIfValidSquare(square) {
        const row = square.row;
        const col = square.col;
        return (row > -1 && col > -1 && row < GameSettings.BOARD_SIZE && col < GameSettings.BOARD_SIZE);
    }

    checkIfSquarePassable(square,pieceMoving) {
        if (this.getPiece(square) === undefined) {return {squarePassable: true, squareOccupied: false, attackingKing: false};}
        //Otherwise there is a piece
        const occupyingPiece = this.getPiece(square);

        // Friendly piece
        if (occupyingPiece.player === pieceMoving.player) {return {squarePassable: false, squareOccupied: true, attackingKing: false};}

        // King case: never passable
        if (occupyingPiece.type === TYPES.KING) {return {squarePassable: false, squareOccupied: true, attackingKing: true};}

        // Enemy-non King case
        return {squarePassable: true, squareOccupied: true, attackingKing: false};
    }

    checkIfMoveGivesCheck(movingPiece,fromSquare,toSquare) {

        const pieceToStore = this.getPiece(toSquare);
        this.setPiece(toSquare,movingPiece);
        const givesCheck = movingPiece.getAvailableMoves(this).attackingKing;

        this.setPiece(fromSquare,movingPiece);
        this.setPiece(toSquare,pieceToStore);

        return givesCheck;

    }
}

const TYPES = {KING:"King",QUEEN:"Queen", PAWN: "Pawn"};
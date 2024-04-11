import store from "@/store";
import { GameObject } from "./GameObject";

export class PieceHighLight extends GameObject {
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
        console.log("PieceHighLight constructor")
    }

    update() {
        if (store.state.pk.last_piece.x != null && store.state.pk.last_piece.y != null) {
            this.render();
        }
    }

    render() {
        const lastPiece = store.state.pk.last_piece;
        const gridSize = this.gameMap.gridSize;
        const ctx = this.gameMap.ctx;

        const centerX = lastPiece.x * gridSize + gridSize / 2;
        const cneterY = lastPiece.y * gridSize + gridSize / 2;

        const radius = gridSize / 3;
        const lineWidth = gridSize / 2;

        ctx.beginPath();
        ctx.arc(centerX, cneterY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.stroke();
    }
}
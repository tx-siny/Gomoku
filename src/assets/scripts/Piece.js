import { GameObject } from './GameObject.js';

export class Piece extends GameObject {
    constructor(info, gameMap) {
        super();

        this.color = info.color;
        this.x = info.x;
        this.y = info.y;

        this.gameMap = gameMap;
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        const ctx = this.gameMap.ctx;
        const gridSize = this.gameMap.gridSize;

        const centerX = this.x * gridSize;
        const centerY = this.y * gridSize;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, gridSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }

}
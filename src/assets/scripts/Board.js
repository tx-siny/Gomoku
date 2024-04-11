import { GameObject } from './GameObject.js';

export class Board extends GameObject {
    constructor(rowCount, colCount, gameMap) {
        super();

        this.rowCount = rowCount;
        this.colCount = colCount;
        this.gameMap = gameMap;

        this.originPoints = [
            { x: 4, y: 4 },
            { x: 4, y: 12 },
            { x: 12, y: 4 },
            { x: 12, y: 12 },
            { x: 8, y: 8 }
        ];
    }

    update() {
        this.render();
    }

    start() {
        // this.drawBoard();
    }

    // 绘制棋盘
    render() {
        this.gridSize = this.gameMap.gridSize;
        this.ctx = this.gameMap.ctx;

        // 绘制底色
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, (this.colCount - 1) * this.gridSize, (this.rowCount - 1) * this.gridSize);

        // 绘制边框
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(0, 0, (this.colCount - 1) * this.gridSize, (this.rowCount - 1) * this.gridSize);

        // 绘制棋盘
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i < this.rowCount - 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo((this.colCount - 1) * this.gridSize, i * this.gridSize);
            this.ctx.stroke();
        }
        for (let j = 0; j < this.colCount - 1; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(j * this.gridSize, 0);
            this.ctx.lineTo(j * this.gridSize, (this.rowCount - 1) * this.gridSize);
            this.ctx.stroke();
        }

        // 绘制天元
        this.radius = this.gridSize / 8;
        this.originPoints.forEach(point => {
            this.drawPoint(point.x, point.y, 'black');
        });
    }

    drawPoint(x, y, color) {
        const centerX = x * this.gridSize;
        const centerY = y * this.gridSize;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

import { GameObject } from './GameObject.js';

export class Board extends GameObject {
    constructor(rowCount, colCount, gameMap) {
        super();

        this.rowCount = rowCount;
        this.colCount = colCount;
        this.gameMap = gameMap;

        // 五个天元点
        this.originPoints = [
            { x: 3, y: 3 },
            { x: 3, y: 11 },
            { x: 11, y: 3 },
            { x: 11, y: 11 },
            { x: 7, y: 7 }
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

        this.margin = this.gridSize;

        // 绘制边框
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.margin, this.margin, this.colCount * this.gridSize - 2 * this.margin, this.rowCount * this.gridSize - 2 * this.margin);

        // 绘制棋盘
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i < this.rowCount - 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.margin, this.margin + i * this.gridSize);
            this.ctx.lineTo((this.colCount - 2) * this.gridSize + this.margin, this.margin + i * this.gridSize);
            this.ctx.stroke();
        }
        for (let j = 0; j < this.colCount - 1; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.margin + j * this.gridSize, this.margin);
            this.ctx.lineTo(this.margin + j * this.gridSize, (this.rowCount - 2) * this.gridSize + this.margin);
            this.ctx.stroke();
        }

        // 绘制天元
        this.radius = this.gridSize / 8;
        this.originPoints.forEach(point => {
            this.drawPoint(point.x + 1, point.y + 1, 'black');
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

import { GameObject } from './GameObject.js';

export class Board extends GameObject {
    constructor(rowCount, colCount, gameMap) {
        super();

        this.rowCount = rowCount;
        this.colCount = colCount;
        this.gameMap = gameMap;

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

        // 绘制底色
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.colCount * this.gridSize, this.rowCount * this.gridSize);

        // 绘制边框
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(0, 0, this.colCount * this.gridSize, this.rowCount * this.gridSize);

        // 绘制棋盘
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i < this.rowCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.gridSize / 2,
                i * this.gridSize + this.gridSize / 2);
            this.ctx.lineTo((this.colCount - 1) * this.gridSize + this.gridSize / 2,
                i * this.gridSize + this.gridSize / 2);
            this.ctx.stroke();
        }
        for (let j = 0; j <= this.colCount; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(j * this.gridSize + this.gridSize / 2,
                this.gridSize / 2);
            this.ctx.lineTo(j * this.gridSize + this.gridSize / 2,
                (this.rowCount - 1) * this.gridSize + this.gridSize / 2);
            this.ctx.stroke();
        }

        // 绘制天元
        this.radius = this.gridSize / 8;
        this.originPoints.forEach(point => {
            this.drawPoint(point.x, point.y, 'black');
        });
    }

    drawPoint(x, y, color) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

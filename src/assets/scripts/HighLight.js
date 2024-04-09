import { GameObject } from './GameObject.js';

export class HighLight extends GameObject {
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }

    update() {
        if (this.gameMap.selectedPoint) {
            this.render();
        }
    }

    // 绘制高亮效果
    render() {
        const { selectedPoint, gridSize } = this.gameMap;
        const ctx = this.gameMap.ctx;

        if (this.gameMap.GAME_MAP[selectedPoint.x][selectedPoint.y]) {
            return;
        }

        if (this.gameMap.store.state.pk.status == 'over') {
            return;
        }

        const centerX = selectedPoint.x * gridSize;
        const cneterY = selectedPoint.y * gridSize;

        const lineLength = 0.3 * gridSize;
        const lineDistance = 0.12 * gridSize;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;

        // 左上角
        ctx.beginPath();
        ctx.moveTo(centerX - lineDistance, cneterY - lineDistance);
        ctx.lineTo(centerX - lineDistance - lineLength, cneterY - lineDistance);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - lineDistance, cneterY - lineDistance);
        ctx.lineTo(centerX - lineDistance, cneterY - lineDistance - lineLength);
        ctx.stroke();

        // 右上角
        ctx.beginPath();
        ctx.moveTo(centerX + lineDistance, cneterY - lineDistance);
        ctx.lineTo(centerX + lineDistance + lineLength, cneterY - lineDistance);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX + lineDistance, cneterY - lineDistance);
        ctx.lineTo(centerX + lineDistance, cneterY - lineDistance - lineLength);
        ctx.stroke();

        // 左下角
        ctx.beginPath();
        ctx.moveTo(centerX - lineDistance, cneterY + lineDistance);
        ctx.lineTo(centerX - lineDistance - lineLength, cneterY + lineDistance);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - lineDistance, cneterY + lineDistance);
        ctx.lineTo(centerX - lineDistance, cneterY + lineDistance + lineLength);
        ctx.stroke();

        // 右下角
        ctx.beginPath();
        ctx.moveTo(centerX + lineDistance, cneterY + lineDistance);
        ctx.lineTo(centerX + lineDistance + lineLength, cneterY + lineDistance);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX + lineDistance, cneterY + lineDistance);
        ctx.lineTo(centerX + lineDistance, cneterY + lineDistance + lineLength);
        ctx.stroke();
    }
}

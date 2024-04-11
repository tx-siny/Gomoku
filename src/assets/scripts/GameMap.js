import { GameObject } from "./GameObject";
import { Board } from "./Board";
import { HighLight } from "./HighLight";
import { Piece } from "./Piece";
import { PieceHighLight } from "./PieceHighLight";

export class GameMap extends GameObject {
    constructor(ctx, parent, store) {
        super();

        this.store = store;
        this.ctx = ctx;
        this.parent = parent;

        this.rowCount = 15;
        this.colCount = 15;

        // 记录该点是否放置棋子
        this.GAME_MAP = new Array(this.rowCount).fill(false).map(() => new Array(this.colCount).fill(false));

        this.gridSize = 0;

        this.selectedPoint = null;
        this.isMouseInside = false;
    }

    start() {
        if (this.store.state.pk.status == 'record') {
            const a_steps = this.store.state.record.stepsA;
            const b_steps = this.store.state.record.stepsB;

            let turn = 'black';
            const interval = setInterval(() => {
                if (turn == 'black') {
                    console.log(a_steps);
                    const step = a_steps.shift();
                    if (step) {
                        this.putPiece(step.x, step.y, 'black');
                        this.store.commit('updateLastPiece', {
                            x: step.x,
                            y: step.y
                        })
                        turn = 'white';
                    } else {
                        if (b_steps != null) return;
                        clearInterval(interval);
                    }
                } else {
                    console.log(b_steps)
                    const step = b_steps.shift();
                    if (step) {
                        this.putPiece(step.x, step.y, 'rgb(88, 185, 157)');
                        this.store.commit('updateLastPiece', {
                            x: step.x,
                            y: step.y
                        })
                        turn = 'black';
                    } else {
                        if (a_steps != null) return;
                        clearInterval(interval);
                    }
                }
            }, 1000)
        }
        this.addMouseEventListener();
        this.Board = new Board(this.rowCount, this.colCount, this);
        new HighLight(this);
        new PieceHighLight(this);
    }

    // 更新尺寸
    updateSize() {
        this.gridSize = Math.min(this.parent.clientWidth / this.colCount, this.parent.clientHeight / this.rowCount);
        this.ctx.canvas.width = this.colCount * this.gridSize;
        this.ctx.canvas.height = this.rowCount * this.gridSize;
    }

    update() {
        this.updateSize();
    }

    render() {
    }

    addMouseEventListener() {
        this.ctx.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.ctx.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));
        this.ctx.canvas.addEventListener('click', this.handleMouseClick.bind(this));
    }

    handleMouseMove(event) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const mousePos = {
            x: Math.max(event.clientX - rect.left - this.gridSize / 2, 0),
            y: Math.max(event.clientY - rect.top - this.gridSize / 2, 0)
        };

        let mindistance = Infinity;
        let nearestPoint = null;

        let pointList = [
            { x: Math.floor(mousePos.x / this.gridSize), y: Math.floor(mousePos.y / this.gridSize) }
        ]
        pointList[1] = { x: pointList[0].x + 1, y: pointList[0].y };
        pointList[2] = { x: pointList[0].x, y: pointList[0].y + 1 };
        pointList[3] = { x: pointList[0].x + 1, y: pointList[0].y + 1 };

        for (let point of pointList) {
            const distance = Math.pow(mousePos.x - point.x * this.gridSize, 2) + Math.pow(mousePos.y - point.y * this.gridSize, 2);
            if (distance < mindistance) {
                mindistance = distance;
                nearestPoint = point;
            }
        }

        if (nearestPoint && nearestPoint.x >= 0 && nearestPoint.x < this.colCount && nearestPoint.y >= 0 && nearestPoint.y < this.rowCount) {
            this.selectedPoint = nearestPoint;
            this.isMouseInside = true;
            this.selectedPoint.x = Math.max(0, this.selectedPoint.x);
            this.selectedPoint.x = Math.min(this.colCount, this.selectedPoint.x);
            this.selectedPoint.y = Math.max(0, this.selectedPoint.y);
            this.selectedPoint.y = Math.min(this.rowCount, this.selectedPoint.y);
        } else {
            this.selectedPoint = null;
            this.isMouseInside = false;

        }
        this.update();
    }

    handleMouseOut() {
        this.selectedPoint = null;
        this.isMouseInside = false;
        this.update();
    }

    handleMouseClick() {
        if (this.store.state.pk.status != 'playing') {
            return;
        }
        if (this.selectedPoint && !this.GAME_MAP[this.selectedPoint.x][this.selectedPoint.y]) {
            // const pieceInfo = {
            //     // color: 'black',
            //     color: 'rgb(88, 185, 157)',
            //     x: this.selectedPoint.x,
            //     y: this.selectedPoint.y
            // }
            // new Piece(pieceInfo, this);
            // this.GAME_MAP[this.selectedPoint.x][this.selectedPoint.y] = true;
            console.log(this.selectedPoint);
            const x = this.selectedPoint.x;
            const y = this.selectedPoint.y;
            this.store.state.pk.socket.send(JSON.stringify({
                event: 'put-piece',
                x,
                y
            }));
        }
    }

    putPiece(x, y, color) {
        const pieceInfo = {
            color,
            x,
            y
        }
        new Piece(pieceInfo, this);
        this.GAME_MAP[x][y] = true;
    }
}

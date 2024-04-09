const GAME_OBJECTS = [];

export class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);
        this.tiem_delta = 0;
        this.has_started = false;
    }

    start() {
        console.log('start');
    }

    update() {
    }

    destory() {
        for (let i in GAME_OBJECTS) {
            const obj = GAME_OBJECTS[i];
            if (obj == this) {
                GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
}

let last_tiem = 0;
const step = timestamp => {
    for (let obj of GAME_OBJECTS) {
        if (!obj.has_started) {
            obj.has_started = true;
            obj.start();
        } else {
            obj.tiem_delta = timestamp - last_tiem;
            obj.update();
        }
    }

    last_tiem = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);
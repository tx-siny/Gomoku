<template>
    <div class="percent" ref="percent">
        <svg>
            <circle r="60" cx="55" cy="55" />
            <circle r="55" cx="55" cy="55" :id="circleId" class="animated-circle" :style="{ stroke: calcStrokeColor() }" />
        </svg>
        <div class="number">
            <h3>
                <span id="percnt">{{ countdown }}</span>
            </h3>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
    props: {
        identifier: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const INITTIME = 60;

        let circleId = computed(() => `circle_${props.identifier}`);
        let circle = ref(null);

        let countdown = ref(INITTIME);
        let timer = null;
        let running = ref(false);

        const decreaseTime = () => {
            if (countdown.value > 0) {
                countdown.value -= 1;
                circle.value.style.strokeDashoffset = 345.5 * (INITTIME - countdown.value) / INITTIME;
            } else {
                clearInterval(timer);
                // reset();
                // resume();
            }
            console.log(countdown.value)
            console.log(circle.value.style.strokeDashoffset)
        }

        const pause = () => {
            clearInterval(timer);
            running.value = false;
        }

        const resume = () => {
            if (!running.value) {
                timer = setInterval(decreaseTime, 1000);
                running.value = true;
            }
        }

        const reset = () => {
            clearInterval(timer);
            countdown.value = INITTIME;
            circle.value.style.transitionDuration = '0.5s'; // 缩短过渡动画时间
            circle.value.style.strokeDashoffset = 0;
            circle.value.style.stroke = calcStrokeColor();
            running.value = false;
            setTimeout(() => {
                circle.value.style.transitionDuration = '5s'; // 恢复原来的过渡动画时间
            }, 500);
        };

        const calcStrokeColor = () => {
            if (countdown.value > 30) {
                return '#43e160'; // 绿色
            } else if (countdown.value > 15) {
                return '#ffc107'; // 黄色
            } else {
                return '#dc3545'; // 红色
            }
        }

        onMounted(() => {
            circle.value = document.getElementById(circleId.value);
            console.log(circle.value)
            console.log(circleId.value)
            // timer = setInterval(decreaseTime, 1000);
        });

        return {
            countdown,
            pause,
            resume,
            reset,
            calcStrokeColor,
            circleId,
            running
        };
    }
}
</script>


<style scoped>
.percent {
    position: relative;
    justify-content: center;
    width: 120px;
    height: 120px;
}

.percent svg {
    position: absolute;
}

.percent svg circle {
    transform: translate(5px, 5px);
}

.percent svg circle:nth-child(1) {
    fill: #f3f3f362;
}

.percent svg circle:nth-child(2) {
    fill: none;
    stroke-width: 10;
    stroke-dasharray: 345.5;
    stroke-dashoffset: 0;
    stroke: #43e160;
    transform: translate(5px, 5px) rotate(-90deg);
    transform-origin: 55px 55px;
    transition: stroke-dashoffset 1s linear, stroke 5s ease;
}

.percent .number {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    left: 0;
    top: 0;
}

.percent .number span:nth-child(1) {
    font-size: 48px;
    font-weight: 600;
}
</style>
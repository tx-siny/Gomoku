<template>
    <div class="countdown">
        <!-- 显示倒计时 -->
        <span class="countdown-text">{{ remainingTime }}</span>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        initialTime: {
            type: Number,
            default: 30
        }
    },
    setup(props, { emit }) {
        const remainingTime = ref(props.initialTime);
        let timer = null;

        const start = () => {
            if (timer) return;
            timer = setInterval(() => {
                if (remainingTime.value > 0) {
                    remainingTime.value--;
                } else {
                    clearInterval(timer);
                    timer = null;
                    emit('time-up');
                }
            }, 1000);
        };

        const pause = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };

        const reset = () => {
            pause();
            remainingTime.value = props.initialTime;
        };

        watch(() => props.initialTime, (newTime) => {
            reset();
            remainingTime.value = newTime;
        });

        return {
            remainingTime,
            start,
            pause,
            reset
        };
    }
}
</script>

<style scoped>
.countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
}

.countdown-text {
    font-size: 5em; /* 增大字体 */
    color: red; /* 设置字体颜色 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字阴影 */
    animation: countdown 1s ease-out; /* 添加倒计时动画 */
}

@keyframes countdown {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
</style>
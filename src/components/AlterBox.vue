<template>
    <div>
        <div class="alert-container">
            <transition-group name="fade">
                <div v-for="alert in alerts" :key="alert.id" class="alert alert-dismissible fade" role="alert"
                    :class="[alert.color, { 'show': alert.visible }]" :style="{ width: alert.width }">
                    {{ alert.message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                        @click="hideAlert(alert.id)"></button>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        defaultAlertMessage: {
            type: String,
            default: "这是一个警示框！"
        },
        defaultAlertColor: {
            type: String,
            default: "alert-info"
        },
        defaultAlertWidth: {
            type: String,
            default: "300px"
        },
        defaultButtonMessage: {
            type: String,
            default: "触发警示框"
        },
    },
    setup(props) {
        const alerts = ref([]);
        const message = ref(props.defaultButtonMessage);

        const showAlertWithProperties = (message, color, width) => {
            const alert = {
                id: Date.now(),
                message: message || props.defaultAlertMessage,
                color: color || props.defaultAlertColor,
                width: width || props.defaultAlertWidth,
                visible: true
            };
            alerts.value.push(alert);
            setTimeout(() => {
                hideAlert(alert.id);
            }, 3000); // 3秒后自动消失
        };

        const showAlert = () => {
            const alert = {
                id: Date.now(),
                message: props.defaultAlertMessage,
                color: props.defaultAlertColor,
                width: props.defaultAlertWidth,
                visible: true
            };
            alerts.value.push(alert);
            setTimeout(() => {
                hideAlert(alert.id);
            }, 3000); // 3秒后自动消失
        };

        const hideAlert = (id) => {
            const alert = alerts.value.find(alert => alert.id === id);
            if (alert) {
                alert.visible = false;
                setTimeout(() => {
                    removeAlert(id);
                }, 500); // 等待动画结束后再移除警示框
            }
        };

        const removeAlert = (id) => {
            alerts.value = alerts.value.filter(alert => alert.id !== id);
        };

        return {
            alerts,
            message,
            showAlertWithProperties,
            showAlert,
            hideAlert,
            removeAlert
        };
    }
};
</script>

<style>
.alert-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 9999;
}

.alert {
    transition: opacity 0.5s ease;
}

.show {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

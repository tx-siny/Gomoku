<template>
    <div class="container">
        <CountDown ref="countDownA" identifier="1" style="margin-top: 20%;" />
        <UserAvatar class="playing-user" :user="user2"></UserAvatar>
    </div>
</template>

<script>
import CountDown from '@/components/CountDown.vue';
import { ref, onMounted } from 'vue';

export default {
    components: {
        CountDown
    },
    setup() {
        const countDownA = ref(null);
        const countDownB = ref(null);
        onMounted(() => {
            console.log(countDownA.value)
            countDownA.value.resume();
        })
        return {
            countDownA,
            countDownB
        }
    }
}
</script>

<style scoped>
</style>
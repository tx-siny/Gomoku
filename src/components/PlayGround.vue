<template>
    <div class="playground">
        <GameMap />
    </div>
</template>

<script>
import GameMap from '../components/GameMap.vue';

export default {
    components: {
        GameMap
    }
}
</script>

<style scoped>
div.playground {
    width: 60vw;
    height: 70vh;
    /* background: rgba(50, 50, 50, 50); */
    margin: 10vh auto;
}
</style>
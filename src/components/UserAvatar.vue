<template>
    <div >
        <div class="user-avatar" :style="{ backgroundImage: `url(${user.avatar})` }"></div>
        <p class="username" v-if="!user.opponent">{{ user.username }}</p>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.username {
    font-weight: bold;
    font-family: 'Arial Black', 'Arial Bold', Gadget, sans-serif;
    font-size: x-large;
    text-align: center;
    margin-top: 10%;
    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
</style>
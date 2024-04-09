<template>
    <div class="container" v-if="$store.state.pk.status === 'playing' || $store.state.pk.status === 'over'">
        <div>
            <UserAvatar class="playing-user" :user="user1"></UserAvatar>
            <CountDown :class="$store.state.pk.away ? 'count-down-b' : 'count-down-a'" />
        </div>
        <PlayGround />
        <div>
            <UserAvatar class="playing-user" :user="user2"></UserAvatar>
            <CountDown :class="$store.state.pk.away ? 'count-down-a' : 'count-down-b'" />
        </div>
    </div>
    <MatchGround v-else />
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import MatchGround from '@/components/MatchGround.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import CountDown from '@/components/CountDown.vue';
import store from '@/store';
import { inject, onMounted, ref } from 'vue';

export default {
    components: {
        PlayGround,
        MatchGround,
        UserAvatar,
        CountDown
    },
    setup() {
        const alertBoxRef = inject('alertBoxRef');

        let socket = null;
        const socketUrl = `ws://127.0.0.1:2002/websocket/${store.state.user.token}/`;

        const user1 = {
            username: store.state.user.username,
            avatar: store.state.user.avatar
        }

        let user2 = ref({
            username: store.state.pk.opponent_username,
            avatar: store.state.pk.opponent_avatar
            // username: store.state.user.username,
            // avatar: store.state.user.avatar
        })

        const color = ['black', 'rgb(88, 185, 157)'];

        onMounted(() => {
            store.commit('resetState')

            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log('Connected!');
                store.commit('updateSocket', socket);
                console.log(store.state.pk.socket);
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                console.log(data);
                switch (data.event) {
                    case 'start-matching-response':
                        if (data.status === 'success') {
                            store.commit('updateStatus', 'matching');
                            alertBoxRef.value.showAlertWithProperties('正在匹配对手，请稍等！', 'alert-info');
                        } else {
                            alertBoxRef.value.showAlertWithProperties('匹配失败，请重试！', 'alert-danger');
                        }
                        break;
                    case 'cancel-matching-response':
                        if (data.status === 'success') {
                            store.commit('updateStatus', 'waiting');
                            alertBoxRef.value.showAlertWithProperties('已取消匹配！', 'alert-warning');
                        } else {
                            alertBoxRef.value.showAlertWithProperties('取消匹配失败，请重试！', 'alert-danger');
                        }
                        break;
                    case 'start-game':
                        store.commit('updateStatus', 'playing');
                        alertBoxRef.value.showAlertWithProperties('匹配成功，游戏开始！', 'alert-success');
                        if (data.away) {
                            alertBoxRef.value.showAlertWithProperties('对方先手！', 'alert-info');
                        } else {
                            alertBoxRef.value.showAlertWithProperties('您是先手！', 'alert-info');
                        }
                        store.commit('updateOpponent', {
                            opponent_username: data.opponent_username,
                            opponent_avatar: data.opponent_avatar,
                            away: data.away,
                            success() {
                                user2.value.username = store.state.pk.opponent_username;
                                user2.value.avatar = store.state.pk.opponent_avatar;
                            }
                        })
                        break;
                    case 'put-piece':
                        store.commit('updateRound');
                        if (store.state.pk.round % 2 == 1) {
                            store.state.pk.gameMap.putPiece(data.x, data.y, color[0]);
                        } else if (store.state.pk.round % 2 == 0) {
                            store.state.pk.gameMap.putPiece(data.x, data.y, color[1]);
                        }
                        break;
                    case 'game-over':
                        store.commit('updateStatus', 'over');
                        alertBoxRef.value.showAlertWithProperties('游戏结束！', 'alert-success');
                        break;
                    default:
                        break;
                }
            }
        })

        return {
            user1,
            user2,
            alertBoxRef,
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.class-playing-user {
    width: 10vw;
    height: 10vw;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10vh;
}

.playing-user /deep/ .user-avatar {
    width: 10vw;
    height: 10vw;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10vh;
}
</style>
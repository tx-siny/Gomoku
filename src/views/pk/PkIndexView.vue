<template>
    <div class="container" v-if="$store.state.pk.status === 'playing'">
        <UserAvatar class="playing-user" :user="user1"></UserAvatar>
        <PlayGround />
        <UserAvatar class="playing-user" :user="user2"></UserAvatar>
    </div>
    <div v-else>
        <div class="container" style="margin-top: 10vh;">
            <UserAvatar class="matching-user" :user="user1"></UserAvatar>
            <div class="bot-select">
                <UserAvatar class="matching-user" :user="user2"></UserAvatar>
                <select class="form-select" :disabled="$store.state.pk.status !== 'waiting'" style=" margin-top: 10%; width: 50%; ">
                    <option value="-1" selected>玩家匹配</option>
                    <option value="1">人机：简单</option>
                    <option value="2">人机：困难</option>
                </select>
            </div>
        </div>
        <div class="col-12" style="text-align: center; padding-top: 10vh;">
            <button type="button" :class="btnMessage === '开始匹配' ? 'btn btn-warning btn-lg' : 'btn btn-danger btn-lg'"
                style="width: 15%;" @click="matchBtnClick">{{ btnMessage }}</button>
        </div>
    </div>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import store from '@/store';
import { inject, onMounted } from 'vue';
import { ref } from 'vue';

export default {
    components: {
        PlayGround,
        UserAvatar
    },
    setup() {
        const alertBoxRef = inject('alertBoxRef');
        let btnMessage = ref('开始匹配');

        let scoket = null;
        const scoketUrl = `ws://127.0.0.1:2002/websocket/${store.state.user.token}/`;

        const user1 = {
            username: store.state.user.username,
            avatar: store.state.user.avatar
        }

        let user2 = ref({
            username: store.state.pk.opponent_username,
            avatar: store.state.pk.opponent_avatar
        })
        const updateUser2 = () => {
            user2.value.username = store.state.pk.username;
            user2.value.avatar = store.state.pk.opponent_avatar;
        }

        onMounted(() => {
            store.commit('resetState')
            updateUser2();

            scoket = new WebSocket(scoketUrl);

            scoket.onopen = () => {
                console.log('Connected!');
                store.commit('updateSocket', scoket);
            }

            scoket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                switch (data.event) {
                    case 'start-matching-response':
                        if (data.status === 'success') {
                            store.commit('updateStatus', 'matching');
                            btnMessage.value = '取消匹配';
                            alertBoxRef.value.showAlertWithProperties('正在匹配对手，请稍等！', 'alert-info');
                        } else {
                            alertBoxRef.value.showAlertWithProperties('匹配失败，请重试！', 'alert-danger');
                        }
                        break;
                    case 'cancel-matching-response':
                        if (data.status === 'success') {
                            store.commit('updateStatus', 'waiting');
                            btnMessage.value = '开始匹配';
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
                                updateUser2();
                            }
                        })
                        break;
                    default:
                        break;
                }
            }
        })

        const matchBtnClick = () => {
            if (store.state.pk.status === 'matching') {
                scoket.send(JSON.stringify({
                    event: 'cancel-matching'
                }));
                // store.commit('updateStatus', 'waiting');
                // btnMessage.value = '开始匹配';
                // alertBoxRef.value.showAlertWithProperties('已取消匹配！', 'alert-warning');
            } else {
                scoket.send(JSON.stringify({
                    event: 'start-matching',
                    opponent: 'people'
                }));
                // store.commit('updateStatus', 'matching');
                // btnMessage.value = '取消匹配';
                // alertBoxRef.value.showAlertWithProperties('正在匹配对手，请稍等！', 'alert-info');
            }
        }

        return {
            user1,
            user2,
            alertBoxRef,
            btnMessage,
            matchBtnClick
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

.matching-user /deep/ .user-avatar {
    width: 15vw;
    height: 15vw;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10vh;
}

.class-opponent-avatar {
    width: 15vw;
    height: 15vw;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10vh;
}

.bot-select {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
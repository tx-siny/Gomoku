<template>
    <div class="container" style="margin-top: 10vh;">
        <UserAvatar class="matching-user" :user="user1"></UserAvatar>
        <div class="bot-select">
            <UserAvatar class="matching-user" :user="user2"></UserAvatar>
            <select class="form-select" :disabled="$store.state.pk.status !== 'waiting'"
                style=" margin-top: 10%; width: 50%; ">
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
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue';
import store from '@/store';
import { computed } from 'vue';


export default {
    components: {
        UserAvatar
    },
    setup() {
        let btnMessage = computed(() => {
            return store.state.pk.status === 'matching' ? '取消匹配' : '开始匹配';
        });

        const user1 = {
            username: store.state.user.username,
            avatar: store.state.user.avatar
        }

        const user2 = {
            username: store.state.pk.opponent_username,
            avatar: store.state.pk.opponent_avatar,
            opponent: true
        }

        // let user2 = ref({
        //     username: store.state.pk.opponent_username,
        //     avatar: store.state.pk.opponent_avatar
        // })

        const matchBtnClick = () => {
            if (store.state.pk.status === 'matching') {
                store.state.pk.socket.send(JSON.stringify({
                    event: 'cancel-matching'
                }));
            } else {
                store.state.pk.socket.send(JSON.stringify({
                    event: 'start-matching',
                    opponent: 'people'
                }));
            }
        }

        return {
            user1,
            user2,
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

.matching-user /deep/ .user-avatar {
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
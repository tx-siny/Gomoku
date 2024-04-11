<template>
    <div class="container">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <UserAvatar class="playing-user" :user="user1"></UserAvatar>
        </div>
        <PlayGround />
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <UserAvatar class="playing-user" :user="user2"></UserAvatar>
        </div>
    </div>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import store from '@/store';

import { ref } from 'vue';
import $ from 'jquery';

export default {
    components: {
        PlayGround,
        UserAvatar
    },
    setup() {
        const pathName = window.location.pathname;
        const recordId = pathName.substring(8, pathName.length - 1);

        let user1 = ref({
            username: store.state.user.username,
            avatar: store.state.user.avatar

        });
        let user2 = ref({
            username: store.state.user.username,
            avatar: store.state.user.avatar
        });

        const formatData = data => {
            if (data == null) return [];
            const matches = data.match(/\[\d+,\d+\]/g);
            if (matches == null) return [];
            return matches.map(item => {
                const [x, y] = item.replace(/\[|\]/g, '').split(',');
                return { x: parseInt(x, 10), y: parseInt(y, 10) };
            });
        }

        const getRecord = recordId => {
            $.ajax({
                url: 'http://127.0.0.1:2002/record/info/',
                type: 'GET',
                async: false,
                data: {
                    record_id: recordId
                },
                headers: {
                    Authorization: 'Bearer ' + store.state.user.token
                },
                success(res) {
                    console.log(res)
                    store.commit('updateRecord', {
                        player_a: res.player_a,
                        player_b: res.player_b,
                        steps_a: formatData(res.steps_a),
                        steps_b: formatData(res.steps_b)
                    });
                    user1.value = {
                        username: res.a_username,
                        avatar: res.a_avatar
                    };
                    user2.value = {
                        username: res.b_username,
                        avatar: res.b_avatar
                    };
                }
            })
        }

        store.commit('resetState')
        store.commit('updateStatus', 'record');
        getRecord(recordId);

        return {
            user1,
            user2
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

.playing-user /deep/ .user-avatar {
    width: 10vw;
    height: 10vw;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10vh;
}
</style>
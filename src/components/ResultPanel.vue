<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.winner == $store.state.user.id">
            Win
        </div>
        <div class="result-board-text" v-else>
            Lose
        </div>
        <div class="result-board-btn">
            <button @click="returnHome" type="button" class="btn btn-warning btn-lg">
                返回
            </button>
        </div>
    </div>    
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const returnHome = () => {
            console.log("return Home")
            store.commit("resetState");
            // store.commit("updateOpponent", {
            //     username: "我的对手",
            //     photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            // })
        }

        return {
            returnHome
        };
    }
}
</script>

<style scoped>
div.result-board {
    height: 33vh;
    width: 30vw;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    top: 30vh;
    left: 35vw;
}
div.result-board-text {
    text-align: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    padding-top: 5vh;
}

div.result-board-btn {
    padding-top: 10vh;
    text-align: center;
}
</style>

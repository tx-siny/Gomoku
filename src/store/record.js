export default {
    state: {
        playerAId: '',
        playerBId: '',
        stepsA: [],
        stepsB: [],
    },
    getters: {
    },
    mutations: {
        updateRecord(state, record) {
            state.playerAId = record.player_a;
            state.playerBId = record.player_b;
            state.stepsA = record.steps_a;
            state.stepsB = record.steps_b;
        },
        resetRecord(state) {
            state.playerAId = '';
            state.playerBId = '';
            state.winner = '';
            state.stepsA = [];
            state.stepsB = [];
        }
    },
    actions: {
    },
    modules: {
    }
}

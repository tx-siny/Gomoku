export default {
    state: {
        socket: null,
        status: 'waiting', // waiting, matching, playing
        opponent_id: '',
        opponent_username: '',
        opponent_avatar: 'https://github.com/txsiny/picture/assets/42532696/72d9a03b-e8d0-4461-ba2f-19a188e173da',
        away : false,
        gameObject: null,
    },
    getters: {
    },
    mutations: {
        updateGameObject(state, gameObject) {
            state.gameObject = gameObject
        },
        updateSocket(state, socket) {
            state.socket = socket
        },
        updateStatus(state, status) {
            state.status = status
        },
        updateOpponent(state, data) {
            state.opponent_id = data.opponent_id
            state.opponent_username = data.opponent_username
            state.opponent_avatar = data.opponent_avatar
            state.away = data.away,
            data.success()
        },
        resetState(state) {
            console.log('resetState')
            state.status = 'waiting',
            state.opponent_username = '我的对手',
            state.opponent_avatar = 'https://github.com/txsiny/picture/assets/42532696/72d9a03b-e8d0-4461-ba2f-19a188e173da',
            state.away = false
        }
    },
    actions: {
    },
    modules: {
    }
}

export default {
    state: {
        socket: null,
        status: 'waiting', // waiting, matching, playing, over, record
        winner: '',
        opponent_id: '',
        opponent_username: '',
        opponent_avatar: 'https://github.com/txsiny/picture/assets/42532696/72d9a03b-e8d0-4461-ba2f-19a188e173da',
        away : false,
        gameMap: null,
        round: 0,
        last_piece: {
            x: null,
            y: null,
        }
    },
    getters: {
    },
    mutations: {
        updateGameMap(state, gameMap) {
            state.gameMap = gameMap
        },
        updateSocket(state, socket) {
            state.socket = socket
            console.log('updateSocket', state.socket)
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
            state.away = false,
            state.round = 0,
            state.winner = '',
            state.last_piece = {
                x: null,
                y: null,
            }
        },
        updateRound(state) {
            state.round = state.round + 1
        },
        updateWinner(state, winner) {
            state.winner = winner
        },
        updateLastPiece(state, piece) {
            state.last_piece = piece
        }
    },
    actions: {
    },
    modules: {
    }
}

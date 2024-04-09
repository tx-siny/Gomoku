import $ from 'jquery';

export default {
    state: {
        id: '',
        username: '',
        avatar: '',
        token: '',
        is_login: false
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.avatar = user.avatar;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = null;
            state.username = null;
            state.token = null;
            state.is_login = false;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "http://127.0.0.1:2002/user/login/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password
                },
                success(res) {
                    if (res.error_message === 'success') {
                        context.commit('updateToken', res.token);
                        localStorage.setItem('jwt_token', res.token);
                        data.success();
                    } else {
                        data.error();
                    }
                },
                error() {
                    data.error();
                }
            })
        },
        logout(context) {
            localStorage.removeItem('jwt_token');
            context.commit('logout');
        },
        getInfo(context, data) {
            $.ajax({
                url: "http://127.0.0.1:2002/user/info/",
                type: "GET",
                async: false,
                headers: {
                    Authorization: 'Bearer ' + context.state.token
                },
                success(res) {
                    if (res.error_message === 'success') {
                        context.commit('updateUser', {
                            ...res,
                            is_login: true
                        });
                        data.success();
                    } else {
                        data.error();
                    }
                },
                error() {
                    data.error();
                }
            })
        }
    },
    modules: {
    }
}

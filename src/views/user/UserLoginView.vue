<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3" v-if="loginMode">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名：">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="请输入密码：">
                    </div>
                    <div class="switch-loginmode">
                        没有账户？<a href="#" @click="switchLoginMode">注册</a>
                    </div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
            <div class="col-3" v-else>
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名：">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="请输入密码：">
                    </div>
                    <div class="mb-3">
                        <label for="confirmedPassword" class="form-label">确认密码</label>
                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword"
                            placeholder="请再次输入密码：">
                    </div>
                    <div class="switch-loginmode">
                        已有帐户？<a href="#" @click="switchLoginMode">登录</a>
                    </div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import { ref, inject } from 'vue'
import $ from 'jquery'
import store from '@/store';
import router from '@/router';

export default {
    setup() {
        const alertBoxRef = inject('alertBoxRef');

        let username = ref('');
        let password = ref('');
        let confirmedPassword = ref('');

        let loginMode = ref(true);
        const resetInfo = resetUsername => {
            username.value = resetUsername ? null : username.value;
            password.value = null;
            confirmedPassword.value = null;
        }

        const switchLoginMode = () => {
            resetInfo(true);

            loginMode.value = !loginMode.value;
            console.log('switchLoginMode');
        }

        const login = () => {
            store.dispatch('login', {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch('getInfo', {
                        success() {
                            router.push({ name: 'home' });
                            alertBoxRef.value.showAlertWithProperties('登录成功！', 'alert-success');
                        },
                        error() {
                            alertBoxRef.value.showAlertWithProperties('获取用户信息失败！', 'alert-danger');
                        }
                    })
                },
                error() {
                    resetInfo(false);
                    alertBoxRef.value.showAlertWithProperties('用户名或密码错误！', 'alert-danger');
                }
            })
        }

        const register = () => {
            $.ajax({
                url: 'http://127.0.0.1:2002/user/register/',
                type: 'POST',
                data: {
                    username: username.value,
                    password: password.value,
                    confirmedPassword: confirmedPassword.value
                },
                success(res) {
                    console.log(res);
                    if ('success' === res.error_message) {
                        resetInfo(false);
                        loginMode.value = !loginMode.value;
                        alertBoxRef.value.showAlertWithProperties('注册成功，请登录！', 'alert-success');
                    } else {
                        resetInfo(false);
                        alertBoxRef.value.showAlertWithProperties(res.error_message, 'alert-danger');
                    }
                },
                error() {
                    resetInfo(true);
                    alertBoxRef.value.showAlertWithProperties('注册失败，请重试！', 'alert-danger');
                }
            })
        }

        return {
            username,
            password,
            confirmedPassword,
            login,
            register,
            loginMode,
            switchLoginMode
        }
    },
    components: {
        ContentField
    }
}

</script>

<style scoped>
div.content-field {
    width: 60%;
}

button {
    width: 100%;
}

div.switch-loginmode {
    margin-bottom: 5px;
    text-align: right;
    font-size: small;
}
</style>
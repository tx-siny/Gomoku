<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">Gomoku</router-link>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{name: 'pk_index'}">对战</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{name: 'record_index'}">对战记录</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.user.is_login">
                    <li class="nav-itme dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{$store.state.user.username}}
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" @click="logout" href="#">退出登录</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link :class="route_name == 'user_login' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{name: 'user_login'}">登录</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '@/store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        let route_name = computed(() => route.name)

        const logout = () => {
            store.dispatch('logout');
        }

        return {
            route_name,
            logout
        }
    }
}
</script>

<style scoped></style>

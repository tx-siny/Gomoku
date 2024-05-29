import { createRouter, createWebHistory } from 'vue-router'

import PkView from '../views/pk/PkIndexView.vue'
import RecordIndexView from '../views/record/RecordIndexView.vue'
import UserLoginView from '../views/user/UserLoginView.vue'
import UserIndexView from '../views/user/UserIndexView.vue'
import RecordContentView from '../views/record/RecordContentView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pk/'
  },
  {
    path: '/pk/',
    name: 'pk_index',
    component: PkView
  },
  {
    path: '/record/',
    name: 'record_index',
    component: RecordIndexView
  },
  {
    path: '/record/:recordId/',
    name: 'record_content',
    component: RecordContentView
  },
  {
    path: '/user/:userId/',
    name: 'user_index',
    component: UserIndexView
  },
  // {
  //   path: '/record/:id',
  //   name: 'record_detail',
  //   component: () => import('../views/record/RecordDetailView.vue')
  // },
  {
    path: '/user/login/',
    name: 'user_login',
    component: UserLoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let forceJump = false;
  const jwt_token = localStorage.getItem('jwt_token');

  if (jwt_token) {
    store.commit('updateToken', jwt_token);
    store.dispatch('getInfo', {
      success() {
        console.log("success get info")
      },
      error() {
        store.dispatch('logout');
        forceJump = true;
      }
    });
  } else {
    forceJump = to.name !== 'user_login';
  }

  if (forceJump) {
    next({ name: 'user_login' });
  } else {
    next();
  }
})

export default router
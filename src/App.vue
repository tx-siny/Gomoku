<template>
  <NavBar />
  <router-view></router-view>
  <AlertBox ref="alertBoxRef" />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AlertBox from './components/AlterBox.vue';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { provide, ref } from 'vue';

export default {
  components: {
    NavBar,
    AlertBox
  },
  setup() {
    const alertBoxRef = ref(null);
    provide('alertBoxRef', alertBoxRef);
    return {
      alertBoxRef
    }
  }
}
</script>

<style>
body {
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
}
</style>
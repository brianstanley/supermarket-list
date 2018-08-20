<template>
  <router></router>
</template>
 
<script>
import { VueNativeBase, Root } from "native-base";
import Vue from "vue-native-core";
import {store} from './store/'
import Router from './router'

Vue.use(VueNativeBase);
Vue.prototype.$store = store

export default {
  components: {Router, Root}
}
</script>

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';
import Home from './Home.vue';
import Side from './Side.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
let router = new VueRouter({
  routes:[
    {
      path: '/home',
      components: {
        Home: Home,
        Side: Side
      }
    }
  ]
})
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

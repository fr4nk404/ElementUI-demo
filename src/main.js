import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);

/*路由指向
const routes = [
  { path: '/', component: App }
];
const routers = new VueRouter({
  routes: router,
  //history模式比较像正常的url，hash模式带有#号
});*/

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

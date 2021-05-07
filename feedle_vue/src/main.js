import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSessionStorage from "vue-sessionstorage";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueSessionStorage);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

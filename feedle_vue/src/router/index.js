import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/News.vue";
import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "News",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/ReadPost/:id",
    name: "ReadPost",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ReadPost.vue"),
    params: true,
  },
  {
    path: "/Test",
    name: "Test",
    component: Test,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import News from "../views/News.vue";
import Test from "../views/Test.vue";
import Login from "../views/Login.vue";
import AddPost from "../views/AddPost.vue";
import EditPost from "../views/EditPost.vue";
import SignUp from "../views/SignUp.vue";
import Unauthorized from "../views/Unauthorized.vue";
import store from "../store/modules/news";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "News",
    component: News,
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
    path: "/EditPost/:id",
    name: "EditPost",
    component: EditPost,
    params: true,
    beforeEnter(to, from, next) {
      if (store.state.userStatus) {
        next();
      } else {
        next({
          name: "Unauthorized",
        });
      }
    },
  },
  {
    path: "/Test",
    name: "Test",
    component: Test,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/AddPost",
    name: "AddPost",
    component: AddPost,
    beforeEnter(to, from, next) {
      if (store.state.userStatus) {
        next();
      } else {
        next({
          name: "Unauthorized",
        });
      }
    },
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/Unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Board from "../views/Board.vue";
import SignUp from "../components/ViewComponents/AuthComponent/SignUp.vue";
import Login from "../components/ViewComponents/AuthComponent/Login.vue";
import Members from "../views/Members.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/board/:boardId",
    name: "Board",
    component: Board
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/members",
    name: "Members",
    component: Members
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Board from "../views/Board.vue";

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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Board from "../views/Board.vue";
import SignUp from "../components/ViewComponents/AuthComponent/SignUp.vue";
import Login from "../components/ViewComponents/AuthComponent/Login.vue";
import Members from "../views/Members.vue";
import Layout from "../layout/Layout.vue";

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Layout",
		component: Layout,
		children: [
			{
				path: "/dashboard/:dashboardId",
				name: "Dashboard",
				component: Dashboard,
			},
			{
				path: "/board/:boardId",
				name: "Board",
				component: Board
			},
			{
				path: "/members",
				name: "Members",
				component: Members
			},
		]
	},

  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	const publicPages = ["/login", "/signup"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("jwtToken");
	if (authRequired && !loggedIn) {
		return next("/login");
	} else {
		next();
	}
});

export default router

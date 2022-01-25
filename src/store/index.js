import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./auth";
import boards from "./boards";
import invite from "./invite";
import notification from "./notification";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		boards,
		invite,
		notification,

	}
})

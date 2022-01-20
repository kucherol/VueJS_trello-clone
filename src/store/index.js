import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./auth";
import boards from "./boards";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		boards

	}
})

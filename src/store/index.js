import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "../firebase.js";
import router from "../router/index.js";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			firstName: "",
			lastName: "",
			email: "",
			userId: "",
			password: ""
		},
	},
	getters: {
		getUser: state => state.user
	},
	mutations: {
		signUp(state, user) {
			state.user = user
		},
		setUser(state, data) {
			state.user = data
		},
		setUserUID(state, data) {
			state.user.userId = data
		},
	},
	actions: {
		signUp: async ({ commit }, user) => {
			commit("setUser", user);
			await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then(() => {
				firebase.auth().onAuthStateChanged((data) => {
					commit("setUserUID", data.uid);
					firebase.firestore().collection('users').add(user)
					.then(() => {
						router.push("/login");
					}).catch((error) => {
						console.log(error);
					});
				})
			})
		}
	},
	modules: {
	}
})

import firebase from "../firebase.js";
import router from "../router/index.js";


const auth = {
	state: {
		user: {
			firstName: "",
			lastName: "",
			email: "",
			userId: "",
			password: ""
		},
		isLoggedIn: false,
	},
	getters: {
		getUser: state => state.user,
		isLoggedIn: state => state.isLoggedIn
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
		loggedIn_Out(state, data) {
			state.isLoggedIn = data
		}
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
		},
		login: async ({ commit }, user) => {
			commit("setUser", user);
			await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					localStorage.setItem("jwtToken", JSON.stringify(data.user._delegate.accessToken));
					firebase.auth().onAuthStateChanged((data) => {
						commit("setUserUID", data.uid);
						commit("loggedIn_Out", true);
						router.push({
							name: "Dashboard",
							params: { dashboardId: user.userId },
						});
					})
				})
				.catch((error) => {
					console.log(error)
				});
		},
		logout: async ({commit}) => {
			firebase.auth().signOut().then(() => {
				commit("loggedIn_Out", false);
				localStorage.clear();
				router.push({
					name: "Login",
				});
				console.log("logged out")
			}).catch((error) => {
				console.log(error)
			});
		},

	},
}

export default auth

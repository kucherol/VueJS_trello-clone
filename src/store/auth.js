import firebase from "../firebase.js";
import router from "../router/index.js";


const auth = {
	state: {
		user: {
			firstName: "",
			lastName: "",
			email: "",
			userId: "",
			password: "",
			id: "",
		},
		isLoggedIn: false,
		users: [],
	},
	getters: {
		user: state => state.user,
		isLoggedIn: state => state.isLoggedIn,
		users: state => state.users
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
		},
		getUsers(state, data) {
			state.users = data
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
							name: "Dashboard", params: { dashboardId: user.id }
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
		getUsersList: async ({commit}) => {
			await firebase.firestore().collection('users').get()
			.then(function (resp) {
				let newUsers = [];
				resp.forEach((doc) => {
					newUsers.push({
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						email: doc.data().email,
						userId: doc.data().userId,
						id: doc.id
					})
				})
				commit("getUsers", newUsers);
			})
		},

	},
}

export default auth

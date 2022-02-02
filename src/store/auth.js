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
			iconColor: "",
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
		signUp: async ({ commit, dispatch }, user) => {
			commit("setUser", user);
			await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then(() => {
				dispatch("showNotification", { type: "success", message: "Welcome to my-trello App" });
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
			.catch((error) => {
				dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		login: async ({ commit, dispatch, getters }, user) => {
			commit("setUser", user);
			await dispatch("getUsersList");
			await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					localStorage.setItem("jwtToken", JSON.stringify(data.user._delegate.accessToken));
					dispatch("showNotification", { type: "success", message: "Welcome to my-trello App" });
					firebase.auth().onAuthStateChanged((data) => {
						commit("setUserUID", data.uid);
						commit("loggedIn_Out", true);
						let users = getters["users"];
						users.forEach(el => {
							if (data.uid === el.userId) {
								commit("setUser", el)
							}
						})
						router.push({
							name: "Dashboard", params: { dashboardId: getters["user"].id },
						});
					})
				})
				.catch((error) => {
					dispatch("showNotification", { type: "error", message: error.message });
				});
		},
		logout: async ({commit, dispatch}) => {
			firebase.auth().signOut().then(() => {
				commit("loggedIn_Out", false);
				localStorage.clear();
				router.push({
					name: "Login",
				});
				dispatch("showNotification", { type: "success", message: "See you soon" });
			}).catch((error) => {
				dispatch("showNotification", { type: "error", message: error.message });
			});
		},
		getUsersList: async ({commit}) => {
			await firebase.firestore().collection('users').get()
			.then(function (resp) {
				let newUsers = [];
				resp.forEach((doc) => {
					newUsers.push({
						password: doc.data().password,
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						email: doc.data().email,
						userId: doc.data().userId,
						iconColor: doc.data().iconColor,
						id: doc.id
					})
				})
				commit("getUsers", newUsers);
			})
		},
		getUsers() {
			firebase.firestore().collection('users').get()
			.then(response => {
				response.forEach((doc) => {
					this.users.push({
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						email: doc.data().email,
						userId: doc.data().userId,
					})
				})
			})
		},
	},
}

export default auth

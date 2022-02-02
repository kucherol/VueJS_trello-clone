import firebase from "../firebase.js";
import auth from "./auth";



const boards = {
	state: {
		boards: [],
		boardsList: [],
	},
	getters: {
		boards: state => state.boards,
		boardsList: state => state.boardsList,
	},
	mutations: {
		setBoards(state, data) {
			state.boards = data
		},
		setAllBoards(state, data) {
			state.boardsList = data
		},
		setBoardRoute(state, data) {
			state.boardRoute = data
		}
	},
	actions: {
		getBoardsList: async ({ commit }, data) => {
			await firebase.firestore().collection("users").doc(data).collection("boards").get()
			.then(response => {
				let boards = [];
				response.forEach((doc) => {
					boards.push({
						id: doc.id,
						title: doc.data().title,
						color: doc.data().color,
						involvedUsers: doc.data().involvedUsers,
						boardOwner: doc.data().boardOwner,
					})
				})
				commit("setBoards", boards)
			})
		},
		getAllBoards: async ({ commit }) => {
			let boards = [];
			for (let i = 0; i < auth.state.users.length; i++) {
				await firebase.firestore().collection("users").doc(auth.state.users[i].id).collection("boards").get()
				.then(response => {
				response.forEach((doc) => {
					boards.push({
						id: doc.id,
						title: doc.data().title,
						color: doc.data().color,
						involvedUsers: doc.data().involvedUsers,
						boardOwner: doc.data().boardOwner,
					})
				})
				commit("setAllBoards", boards);
				})
			}
		},
	},
}

export default boards

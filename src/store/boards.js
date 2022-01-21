import firebase from "../firebase.js";




const boards = {
	state: {
		boards: [],
	},
	getters: {
		boards: state => state.boards,
	},
	mutations: {
		setBoards(state, data) {
			state.boards = data
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
					})
				})
				commit("setBoards", boards)
			})
		},

	},
}

export default boards

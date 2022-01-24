


const invite = {
	state: {
		emailInvite: false,
	},
	getters: {
		emailInvite: state => state.emailInvite,
	},
	mutations: {
		emailInviteToogler(state, data) {
			state.emailInvite = data
		}
	},
	actions: {
		inviteModal({commit}, data) {
			commit("emailInviteToogler", data)
		}

	},
}

export default invite

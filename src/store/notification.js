


const notification = {
	state: {
		notification: {
			toggle: false,
			timeout: 3000,
			message: null,
			type: null,
		},
	},
	getters: {
		notificationToggle: state => state.notification.toggle,
		notificationTimeout: state => state.notification.timeout,
		notificationMessage: state => state.notification.message,
		notificationType: state => state.notification.type,
	},
	mutations: {
		mutNotificationToggle(state,toggle){
			state.notification.toggle = toggle;
		},
		mutNotificationTimeout(state,timeout){
			state.notification.timeout=timeout;
		},
		mutNotificationMessage(state,message){
			state.notification.message=message;
		},
		mutNotificationType(state,type){
			state.notification.type=type;
		},
	},
	actions: {
		notificationToggleCall({commit}, data) {
			commit("mutNotificationToggle", data)
		},
		showNotification({ commit, dispatch },notification) {
			const type = notification.type;
			const message = notification.message;
			commit("mutNotificationToggle",true);
			commit("mutNotificationMessage",message);
			commit("mutNotificationType",type);
			setTimeout(() => {
				dispatch("hideNotification");
			}, 4200)
		},
		hideNotification({ commit }) {
			commit("mutNotificationToggle",false);
			commit("mutNotificationMessage",null);
			commit("mutNotificationType",null);
		}
	},
}

export default notification

export const namespaced = true;

export const state = {
	notifications: [],
	nextId: 1
};

export const mutations = {
	PUSH(state, notification) {
		state.notifications.push({
			...notification,
			id: state.nextId
		});
		state.nextId = state.nextId + 1;
	},
	DELETE(state, notificationToRemove) {
		state.notifications = state.notifications.filter(
			(notification) => notification.id !== notificationToRemove.id
		);
	},
};

export const actions = {
	add({ commit }, notification) {
		commit('PUSH', notification);
	},
	remove({ commit }, notificationToRemove) {
		commit('DELETE', notificationToRemove);
	},
};

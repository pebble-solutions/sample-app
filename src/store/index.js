import { createStore } from 'vuex'

export default createStore({
	state: {
		structures: [
			{
				id: 1,
				nom_interne: "Cairn",
			},
			{
				id: 2,
				nom_interne: "FE"
			}
		],
		activeStructureId: 1,
		sessLogin: {
			id: 1,
			login: "guillaume",
			type: 6
		}
	},
	getters: {
		activeStructure(state) {
			return state.structures.find(e => e.id === state.activeStructureId);
		}
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})

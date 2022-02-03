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
		},
		mkg: {
			config: {
				THEME_COLOR: 'black'
			}
		},
		elements: [
			{
				id:1,
				name: "Mon titre"
			},
			{
				id:2,
				name: "Mon titre 2"
			},
			{
				id:3,
				name: "Mon nouveau titre"
			}
		],
		openedElement: null
	},
	getters: {
		activeStructure(state) {
			return state.structures.find(e => e.id === state.activeStructureId);
		}
	},
	mutations: {
		/**
		 * Met à jour les informations de configuration
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Object} payload Les valeurs de configuration à écrire
		 */
		mkgConfig(state, payload) {
			state.mkg.config = payload;
		},

		
		/**
		 * Charge un objet dans openedElement
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Object} payload L'ID de l'élément à charger
		 */
		open(state, payload) {
			state.openedElement = payload;
		},


		/**
		 * Ferme l'élément ouvert
		 * @param {Object} state Le state de l'instance VueX
		 */
		close(state) {
			state.openedElement = null;
		},

		/**
		 * Rafraichie la liste des éléments chargés
		 * @param {Array} elements   Liste des éléments à rafraichir
		 * @param {String} option	 replace, add, update
		 */
		refreshElements(state, payload) {
			state.elements = payload;
		}
	},
	actions: {
		/**
		 * Charge un élément depuis le store via son ID
		 * @param {Object} context Instance VueX
		 * @param {Integer} elementId Id de l'élément à charger depuis les éléments existants ou depuis l'API
		 */
		load(context, elementId) {
			let el = context.state.elements.find(e => e.id == elementId);

			if (el) {
				context.commit('open', el);
			}
			else {
				// Il faut générer une requête pour charger l'élément manquant
				console.log('Not found');
			}
		},

		/**
		 * Ferme l'élément ouvert
		 * @param {Object} context Instance VueX
		 */
		unload(context) {
			context.commit('close');
		}
	},
	modules: {
	}
})

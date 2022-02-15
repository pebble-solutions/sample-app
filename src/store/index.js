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
		sessLogin: null,
		mkg: {
			config: {
				THEME_COLOR: 'black'
			}
		},
		elements: [],
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
		 * @param {Integer} id L'ID de l'élément à charger
		 */
		open(state, id) {
			state.openedElement = id;
		},


		/**
		 * Ferme l'élément ouvert
		 * @param {Object} state Le state de l'instance VueX
		 */
		close(state) {
			state.openedElement = null;
		},

		/**
		 * Remplace la liste des éléments chargés avec une nouvelle liste
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		replaceElements(state, elements) {
			state.elements = elements;
		},

		/**
		 * Rafraichie la liste des éléments chargés à partir d'une autre liste.
		 * - si un élément existe dans state et dans elements, il est actualisé avec le nouveau
		 * - si un élément est dans elements mais pas dans state, il est ajouté
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		updateElements(state, elements) {
			elements.forEach(element => {
				let stateEl = state.elements.find(e => e.id === element.id);

				// Mise à jour d'un élément existant
				if (stateEl) {
					for (let key in element) {
						stateEl[key] = element[key];
					}
				}
				// Ajout d'un élément existant
				else {
					state.elements.push(element);
				}
			});
		},

		/**
		 * Retire des éléments de la liste des éléments chargés
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} elements Les ID des éléments à retirer
		 */
		removeElements(state, elements) {
			elements.forEach(id => {
				let index = state.elements.findIndex(e => e.id === id);

				if (index !== -1) {
					state.elements.splice(index, 1);
				}
			});
		},

		/**
		 * Met à jour les données de l'élément chargé
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Liste clé valeur des infos à mettre à jour
		 */
		updateOpened(state, data) {
			for (let key in data) {
				state.openedElement[key] = data[key];
			}
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
		},

		/**
		 * Met à jour la liste des éléments chargés
		 * @param {Object} context L'instance VueX
		 * @param {Object} payload Les paramètres de rafraichissement
		 * - action			update (default), replace, remove
		 * - elements		la liste des éléments
		 */
		refreshElements(context, payload) {
			if (!('action' in payload)) {
				payload.action = 'update';
			}

			if (payload.action == 'update') {
				context.commit('updateElements', payload.elements);
			}
			else if (payload.action == 'replace') {
				context.commit('replaceElements', payload.elements);
			}
			else if (payload.action == 'remove') {
				context.commit('removeElements', payload.elements);
			}
			else {
				throw new Error(`La mutation ${payload.action} n'existe pas.`);
			}
		},

		/**
		 * Met à jour les infos de l'élément ouvert avec des données
		 * @param {Object} context L'instance vueX
		 * @param {Object} data Liste clé valeur des informations à mettre à jour
		 */
		refreshOpened(context, data) {
			context.commit('updateOpened', data);
		}
	},
	modules: {
	}
})

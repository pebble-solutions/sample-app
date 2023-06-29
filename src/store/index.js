import { createStore } from 'vuex'
import { dataCollectionMutation } from '../js/app/services/store';

export default createStore({
	state: {
		structures: [],
		activeStructureId: null,
		login: null,
		elements: [],
		types: [],
		openedElement: null
	},
	getters: {
		activeStructure(state) {
			return state.structures.find(e => e.id === state.activeStructureId);
		}
	},
	mutations: {
		/**
		 * Enregistre le login dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} login L'objet Login
		 */
		setLogin(state, login) {
			state.login = login;
		},

		/**
		 * Enregistre les structures chargées dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} structures La liste des structures
		 */
		setStructures(state, structures) {
			state.structures = structures;
		},

		/**
		 * Enregistre la structure active dans le store
		 * @param {Object} state Le state de vueX
		 * @param {Integer} structureId L'id de la structure à activer
		 */
		setStructureId(state, structureId) {
			state.activeStructureId = structureId;
		},

		/**
		 * Met à jour une collection de données dans le store
		 * 
		 * @param {object} state Le state de VueX
		 * @param {object} collectionOptions Options de la collection à faire mutter
		 * - assetName  	Nom de la clé au niveau du state
		 * - collection 	Informations à stocker dans le state
		 * - action     	'refresh' (par défaut), 'replace', 'remove'
		 */
		dataCollection(state, collectionOptions) {
			dataCollectionMutation(state, collectionOptions)
		},

		/**
		 * Renseigne l'élément actif
		 * 
		 * @param {Object} state Le state de vueX
		 * @param {Integer} element L'élément à charger
		 */
		openedElement(state, element) {
			state.openedElement = element;
		}
	},
	actions: {
		/**
		 * Enregistre l'ouverture d'une session
		 * @param {Object} context L'instance vueX
		 * @param {Object} payload Un objet contenant une clé login et une clé structure
		 */
		login(context, payload) {
			context.commit('setLogin', payload.login);
			context.commit('setStructures', payload.structures);
		},

		/**
		 * Enregistre la fermeture d'une session
		 * @param {Object} context L'instance vueX
		 */
		logout(context) {
			context.commit('setLogin', null);
			context.commit('setStructures', []);
		},

		/**
		 * Bascule sur une structure
		 * @param {Object} context L'instance vueX
		 * @param {Integer} payload L'ID de la structure active
		 */
		switchStructure(context, payload) {
			context.commit('setStructureId', payload);
		},

		/**
		 * Met à jour les données de la collection d'éléments
		 * 
		 * @param {object} context L'instance de VueX
		 * @param {Array} collection La collection à mettre à jour
		 */
		updateElements(context, collection) {
			context.commit('dataCollection', {
				assetName: 'elements',
				collection
			});
		},

		/**
		 * Vide les données stockées dans la collection d'éléments
		 * 
		 * @param {object} context L'instance VueX
		 */
		resetElements(context) {
			context.commit('dataCollection', {
				assetName: 'elements',
				collection: [],
				action: 'replace'
			});
		},

		/**
		 * Met à jour les données de la collection de types
		 * 
		 * @param {object} context L'instance de VueX
		 * @param {Array} collection La collection à mettre à jour
		 */
		updateTypes(context, collection) {
			context.commit('dataCollection', {
				assetName: 'types',
				collection
			});
		},

		/**
		 * Vide les données stockées dans la collection de types
		 * 
		 * @param {object} context L'instance VueX
		 */
		resetTypes(context) {
			context.commit('dataCollection', {
				assetName: 'types',
				collection: [],
				action: 'replace'
			});
		},
	},
	modules: {
	}
})

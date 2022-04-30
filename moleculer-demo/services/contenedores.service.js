const {buscarContenedores} = require('../crud/obtenerContenedores');

module.exports = {
	name: "contenedores",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		obtCont:{
			rest: "/obtCont",
			params: {
				cedula: "string",
				pais: "string"
			},
			/** @param {Context} ctx */
			async handler(route){
                console.log(route.params.pais)
				return buscarContenedores(route.params.pais)
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
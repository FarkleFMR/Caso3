const {postPedido} = require('../crud/postPedido');

module.exports = {
	name: "pedidos",

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

        // call pedidos.newPedido --@clienteId --@contenedorId --@peso --@espacio --@destino --@descripcion
		newPedido:{
			rest: "/newPedido",
			params: {
                clienteId: "string",
                contenedorId: "string",
                peso: "string",
                espacio: "string",
                destino: "string",
                descripcion: "string"
			},
			/** @param {Context} ctx */
			async handler(ctx){
				return postPedido(ctx.params.clienteId, ctx.params.contenedorId, ctx.params.peso, ctx.params.espacio.split(','), ctx.params.destino, ctx.params.descripcion)
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
"use strict";
var Qajax = require("qajax");

var Api = (function () {

	return {

		/**
		 * @method getCatalogues
		 * @return {Promise}
		 */
		getCatalogues: function () {
			return Qajax.getJSON("api/json/categories.json");
		},

		/**
		 * @method getAssetsForCatalogues
		 * @param {Array} catalogues
		 * @return {Promise}
		 */
		getAssetsForCatalogues: function (catalogues) {
			var ready = Promise.resolve(null),
				accumulator = [];
			catalogues.forEach(function (catalogue) {
				ready = ready.then(function () {
					return Api.getAssetsForCatalogue(catalogue);
				}).then(function (assets) {
					var catalogueData = {
						id: catalogue.id,
						name: catalogue.name,
						assets: assets
					};
					accumulator.push(catalogueData);
				});
			});

			return ready.then(function () {
				return accumulator;
			});
		},

		/**
		 * @method getAssetsForCatalogue
		 * @param {Array} catalogue
		 * @return {Promise}
		 */
		getAssetsForCatalogue: function (catalogue) {
			return Qajax.getJSON("api/json/category" + catalogue.id + ".json")
		}

	};
	
}());

module.exports = Api;
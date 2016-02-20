"use strict";

var Api = (function () {

	return {

		/**
		 * @method getCatalogues
		 * @return {Promise}
		 */
		getCatalogues: function () {
			return fetch("api/json/categories.json").then(function (response) {
				return response.json();
			});
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
						items: assets
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
			return fetch("api/json/category" + catalogue.id + ".json").then(function (response) {
				return response.json();
			});
		}

	};

}());

module.exports = Api;
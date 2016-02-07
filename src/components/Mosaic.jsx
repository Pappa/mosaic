"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	MosaicRow = require('./MosaicRow.jsx');

var Mosaic = React.createClass({
	getInitialState: function() {
		return {
			catalogues: [],
			dom: {
				catalogues: []
			},
			visibleRows: 3,
			highlightedRow: 1,
			visibleItems: 3,
			highlightedItem: 1
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			Api.getCatalogues()
				.then(Api.getAssetsForCatalogues)
				.then(function (catalogues) {
					this.setStateOnLoad(catalogues);
				}.bind(this))
				.catch(function (error) {
					console.log(error);
				});
		}
	},
	render: function() {
		var rows = [],
			isHighlighted = false;
		this.state.dom.catalogues.forEach(function (catalogue, i) {
			isHighlighted = (i === this.state.highlightedRow);
			rows.push(<MosaicRow key={i} highlighted={isHighlighted} assets={catalogue.assets} index={i} />);
		}, this);
		return (
			<div className="mosaic">
				{rows} 
			</div>
		);
	},
	setStateOnLoad: function (catalogues) {
		var state = {
				catalogues: catalogues,
				dom: {
					catalogues: []
				}
			},
			rowsToAdd = this.state.visibleRows + 1,
			itemsPerRow = this.state.visibleItems + 2,
			assets = [],
			catalogue,
			i;

		// add an empty row
		assets = Array.apply(null, Array(itemsPerRow)).map(function () { return {}; });
		state.dom.catalogues.push({ assets: assets });

		for (i = 0; i < rowsToAdd; i++) {
			catalogue = {
				assets: [{}]
			};
			if (catalogues[i]) {
				catalogue.id = catalogues[i].id;
				catalogue.name = catalogues[i].name;
				catalogue.assets = catalogue.assets.concat(catalogues[i].assets.slice(0, itemsPerRow - 1));
			}
			state.dom.catalogues.push(catalogue);
		}

		this.setState(state);
	}
});

module.exports = Mosaic;
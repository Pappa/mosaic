"use strict";
var React = require('react'),
	Api = require('../api/Api');

var MosaicItem = React.createClass({
	render: function() {
		var title = (this.props.asset && this.props.asset.title) ? this.props.asset.title : "",
			url = (this.props.asset && this.props.asset.art) ? this.props.asset.art.url : "";
		return (
			<div className={"mosaicItem mosaicItem_" + (this.props.index)}>
				<img src={url} />
				<p>{title}</p>
			</div>
		);
	}
});

var MosaicRow = React.createClass({
	getInitialState: function() {
		return {
			visibleRows: 3,
			highlightedItem: 1 // remove this from child component state
		};
	},
	render: function() {
		var items = [],
			isHighlighted = false;
		this.props.assets.forEach(function (asset, i) {
			isHighlighted = (i === this.state.highlightedItem);
			items.push(<MosaicItem key={i} highlighted={isHighlighted} asset={asset} index={i} />);
		}, this);
		return (
			<div className={"mosaicRow mosaicRow_" + (this.props.index)}>
				{items}
			</div>
		);
	}
});

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
			isHighlighted = (i === this.state.highlightedItem);
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
			itemsPerRow = 5,
			assets = [],
			catalogue = {},
			i,
			j;

		// add an empty row
		for (i = 0; i < itemsPerRow; i++) {
			assets.push({});
		}
		state.dom.catalogues.push({ assets: assets });


		for (i = 0; i < rowsToAdd; i++) {
			catalogue.assets = [];
			// add the 0 element
			catalogue.assets.push({});
			if (catalogues[i]) {
				catalogue.id = catalogues[i].id;
				catalogue.title = catalogues[i].title;
				for (j = 0; j < itemsPerRow; j++) {
					if (catalogues[i].assets[j]) {
						catalogue.assets.push(catalogues[i].assets[j]);
					} else {
						catalogue.assets.push({});
					}
				}

			}

			state.dom.catalogues.push(catalogue);
		}

		this.setState(state);
	}
});

module.exports = Mosaic;
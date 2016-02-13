"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
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
			highlightedItem = null;
		this.state.dom.catalogues.forEach(function (catalogue, i) {
			highlightedItem = (i === this.state.highlightedRow) ? this.state.highlightedItem : null;
			rows.push(<MosaicRow key={i} highlightedItem={highlightedItem} assets={catalogue.assets} index={i} />);
		}, this);
		return (
			<div className="mosaic" tabIndex="0" onKeyDown={this.keyDownHandler}>
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
	},
	keyDownHandler: function (e) {
		e.preventDefault();
		switch (e.keyCode) {
			case Keys.UP:
				this.verticalKeyHandler(-1);
			break;
			case Keys.DOWN:
				this.verticalKeyHandler(1);
			break;
			case Keys.LEFT:
				this.horizontalKeyHandler(-1);
			break;
			case Keys.RIGHT:
				this.horizontalKeyHandler(1);
			break;
			case Keys.SELECT:
				console.log("SELECT");
			break;
		}
	},
	horizontalKeyHandler: function (direction) {
		this.setState({
			highlightedItem: this.state.highlightedItem + direction
		});
	},
	verticalKeyHandler: function (direction) {
		this.setState({
			highlightedRow: this.state.highlightedRow + direction
		});
	}
 });

module.exports = Mosaic;
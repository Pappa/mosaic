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
				// TODO: Remove slice here - need to reference state.catalogues
				// in order to reference them later during navigation without
				// needing to re-slice each time
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
		// TODO: temporary - to ensure we don't navigate outside the visible area
		var newItem = this.state.highlightedItem + direction;
		if (newItem < 1 || newItem > this.state.visibleItems) {
			return false;
		}
		if (this.state.dom.catalogues[this.state.highlightedRow].assets[this.state.highlightedItem + direction]) {
			this.setState({
				highlightedItem: this.state.highlightedItem + direction
			});
		}
	},
	verticalKeyHandler: function (direction) {
		// TODO: temporary - to ensure we don't navigate outside the visible area
		var newItem = this.state.highlightedRow + direction;
		if (newItem < 1 || newItem > this.state.visibleRows) {
			return false;
		}
		if (this.state.dom.catalogues[this.state.highlightedRow + direction]) {
			this.setState({
				highlightedRow: this.state.highlightedRow + direction
			});
		}
	}
 });

module.exports = Mosaic;
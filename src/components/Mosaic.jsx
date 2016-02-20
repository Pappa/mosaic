"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
	MosaicRow = require('./MosaicRow.jsx'),
	Events = require('../common/Events');

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
			highlightedItem: 1,
			yPositions: [-250, 0, 250, 500, 750],
			xPositions: [-360, 0, 360, 720, 1080]
		};
	},
	componentWillMount: function() {
	      window.addEventListener("keydown", this.keyDownHandler, false);
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			this.props.getData()
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
			rowProps = {};
		this.state.yPositions.forEach(function (y, i, yPositions) {
			if (this.state.dom.catalogues[i]) {
				rowProps = {
					key: i,
					y: y,
					highlightedItem: (i === this.state.highlightedRow) ? this.state.highlightedItem : null,
					assets: this.state.dom.catalogues[i].assets,
					index: i,
					xPositions: this.state.xPositions,
					opacity: (i === 0 || i === yPositions.length - 1) ? 0 : 1
				};
				rows.push(<MosaicRow {...rowProps} />);
			}
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

		this.addEmptyRow(state, itemsPerRow);

		for (i = 0; i < rowsToAdd; i++) {
			this.addRow(state, catalogues, i, 0);
		}

		this.setState(state);
	},
	addEmptyRow: function (state, itemsPerRow) {
		var assets = Array.apply(null, Array(itemsPerRow)).map(function () { return {}; });
		state.dom.catalogues.push({ assets: assets });
	},
	addRow: function (state, catalogues, catalogueIndex, startItemIndex) {
		var catalogue = {
				assets: [{}]
			},
			i;
		if (catalogues[catalogueIndex]) {
			catalogue.id = catalogues[catalogueIndex].id;
			catalogue.name = catalogues[catalogueIndex].name;
			for (i = startItemIndex; i < startItemIndex + this.state.visibleItems; i++) {
				catalogue.assets.push(catalogues[catalogueIndex].assets[i]);
			}
		}
		state.dom.catalogues.push(catalogue);
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
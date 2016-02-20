"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
	MosaicRow = require('./MosaicRow.jsx'),
	Events = require('../common/Events');

var Mosaic = React.createClass({
	getInitialState: function() {
		return {
			rows: [],
			dom: {
				rows: []
			},
			visibleRows: 3,
			highlightedRow: 1,
			highlightedRowData: 0,
			visibleItems: 3,
			highlightedItem: 1,
			highlightedItemData: 0,
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
				.then(function (rows) {
					this.setStateOnLoad(rows);
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
			if (this.state.dom.rows[i]) {
				rowProps = {
					key: i,
					y: y,
					highlightedItem: (i === this.state.highlightedRow) ? this.state.highlightedItem : null,
					items: this.state.dom.rows[i].items,
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
	setStateOnLoad: function (rows) {
		var state = {
				rows: rows,
				dom: {
					rows: []
				}
			},
			rowsToAdd = this.state.visibleRows + 1,
			itemsPerRow = this.state.visibleItems + 2,
			items = [],
			row,
			i;

		state.dom.rows.push(this.getEmptyRow(state, itemsPerRow));

		for (i = 0; i < rowsToAdd; i++) {
			this.addRow(state, rows, i, 0);
		}

		this.setState(state);
	},
	getEmptyRow: function (state, itemsPerRow) {
		var items = Array.apply(null, Array(itemsPerRow)).map(function () { return {}; });
		return { items: items };
	},
	addRow: function (state, rows, rowIndex, startItemIndex) {
		var row = {
				items: [{}]
			},
			i;
		if (rows[rowIndex]) {
			row.id = rows[rowIndex].id;
			row.name = rows[rowIndex].name;
			for (i = startItemIndex; i < startItemIndex + this.state.visibleItems; i++) {
				row.items.push(rows[rowIndex].items[i]);
			}
		}
		state.dom.rows.push(row);
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
		var newItem = this.state.highlightedItem + direction;
		if (newItem < 1 || newItem > this.state.visibleItems) {
			this.navigateHorizontal(direction);
		}
		if (this.state.dom.rows[this.state.highlightedRow].items[this.state.highlightedItem + direction]) {
			this.setState({
				highlightedItem: this.state.highlightedItem + direction
			});
		}
	},
	verticalKeyHandler: function (direction) {
		var newItem = this.state.highlightedRow + direction;
		if (newItem < 1 || newItem > this.state.visibleRows) {
			this.navigateVertical(direction);
		}
		if (this.state.dom.rows[this.state.highlightedRow + direction]) {
			this.setState({
				highlightedRow: this.state.highlightedRow + direction
			});
		}
	},
	navigateHorizontal: function (direction) {
		console.log("navigateHorizontal");
	},
	navigateVertical: function (direction) {
		console.log("navigateVertical");
	}
 });

module.exports = Mosaic;
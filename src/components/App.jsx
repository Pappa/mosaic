"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
	HorizontalList = require('./HorizontalList.jsx'),
	Events = require('../common/Events');

var App = React.createClass({
	getInitialState: function() {
		return {
			items: [],
			dom: {
				items: []
			},
			visibleItems: 3,
			highlightedItem: 1,
			highlightedItemData: 0,
			xPositions: [-360, 0, 360, 720, 1080]
		};
	},
	componentWillMount: function() {
	      window.addEventListener("keydown", this.keyHandler, false);
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			this.props.getData()
				.then(function (items) {
					this.setStateOnLoad(items);
				}.bind(this))
				.catch(function (error) {
					console.log(error);
				});
		}
	},
	render: function() {
		if (this.state.dom.items.length) {
			var listProps = {
				highlightedItem: this.state.highlightedItem,
				items: this.state.dom.items,
				xPositions: this.state.xPositions
			};
			return (
				<HorizontalList {...listProps} />
			);
		} else {
			return (
				<div></div>
			);
		}
	},
	setStateOnLoad: function (items) {
		var state = {
				items: items,
				dom: {
					items: [{}]
				}
			};

		items.some(function (item, i) {
			state.dom.items.push(item);
			return (i > this.state.visibleItems);
		}, this);

		this.setState(state);
	},
	keyHandler: function (e) {
		e.preventDefault();
		switch (e.keyCode) {
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
		if (this.state.dom.items[this.state.highlightedItem + direction]) {
			this.setState({
				highlightedItem: this.state.highlightedItem + direction
			});
		}
	},
	navigateHorizontal: function (direction) {
		console.log("navigateHorizontal");
	},
 });

module.exports = App;
"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
	HorizontalList = require('./HorizontalList.jsx'),
	Events = require('../common/Events');

var App = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			items: [],
			visibleItems: 3,
			highlightedItem: 1,
			highlightedData: 0,
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
		if (this.state.items.length) {
			var listProps = {
				highlightedItem: this.state.highlightedItem,
				items: this.state.items,
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
	setStateOnLoad: function (data) {
		var state = {
				data: data,
				items: [{ x: this.state.xPositions[0], opacity: 0 }]
			};

		data.some(function (item, i) {
			item.x = this.state.xPositions[i + 1];
			item.opacity = (i >= this.state.visibleItems) ? 0 : 1;
			state.items.push(item);
			return (i >= this.state.visibleItems);
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
		var newItemIndex = this.state.highlightedItem + direction;
		if (newItemIndex < 1) {
			this.navigateHorizontal(direction);
		} else if (newItemIndex > this.state.visibleItems) {
			this.navigateHorizontal(direction);
		} else if (this.state.items[this.state.highlightedItem + direction]) {
			this.setState({
				highlightedItem: this.state.highlightedItem + direction,
				highlightedData: this.state.highlightedData + direction
			});
		}
	},
	navigateHorizontal: function (direction) {
		console.log("navigateHorizontal");
		/*var state = {
				items: []
			},
			xIndex;
		if (this.state.data[this.state.highlightedData + direction]) {
			// set the next data as highlighted
			state.highlightedData = this.state.highlightedData + direction;
			// set the next dom element as highlighted
			state.highlightedItem = this.state.highlightedItem + direction;
			// correct for first and last
			if (state.highlightedItem < 0) {
				state.highlightedItem = this.state.xPositions.length - 1;
			} else if (state.highlightedItem === this.state.xPositions.length) {
				state.highlightedItem = 0;
			}

			// move all items to new positions
			this.state.items.forEach(function (item, i) {
				var newItem = item;
				xIndex = this.state.xPositions.indexOf(newItem.x) - direction;
				if (xIndex < 0) {
					xIndex = this.state.xPositions.length - 1;
					newItem = this.state.data[this.state.highlightedData + direction];
				} else if (xIndex === this.state.xPositions.length) {
					xIndex = 0;
					newItem = this.state.data[this.state.highlightedData + direction];
				}
				newItem.x = this.state.xPositions[xIndex];
				//newItem.opacity = (xIndex === 0 || xIndex > this.state.visibleItems) ? 0 : 1;
				console.log(xIndex, newItem.x);
				state.items.push(newItem);
			}, this);




			this.setState(state);
			//console.log(this.state.highlightedData + direction, this.state.data[this.state.highlightedData + direction]);
		}*/
		/*var items = [],
			xIndex,
			state = {
				items: []
			};
		this.state.items.forEach(function (item, i) {
			xIndex = this.state.xPositions.indexOf(item.x) - direction;
			if (xIndex < 0) {
				xIndex = this.state.xPositions.length - 1;
			} else if (xIndex === this.state.xPositions.length) {
				xIndex = 0;
			}
			console.log(this.state.xPositions.indexOf(item.x), xIndex, (xIndex === 0 || xIndex > this.state.visibleItems) ? 0 : 1);
			item.x = this.state.xPositions[xIndex];
			item.opacity = (xIndex === 0 || xIndex > this.state.visibleItems) ? 0 : 1;
			state.items.push(item);
		}, this);
		this.setState(state);*/
	},
 });

module.exports = App;
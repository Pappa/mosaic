"use strict";
var React = require('react'),
	Api = require('../api/Api'),
	Keys = require('../common/Keys'),
	HorizontalList = require('./HorizontalList.jsx'),
	Events = require('../common/Events'),
	_L = require('../common/_L');

var App = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			items: [],
			visibleItems: 3,
			highlightedItem: 2,
			highlightedData: 1,
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
				items: [{ x: this.state.xPositions[0]}]
			};

		data.some(function (item, i) {
			item.x = this.state.xPositions[i + 1];
			state.items.push(item);
			return (i >= this.state.visibleItems);
		}, this);

		this.setState(state);
	},
	keyHandler: function (e) {
		e.preventDefault();
		switch (e.keyCode) {
			case Keys.LEFT:
				this.navigateHorizontal(-1);
			break;
			case Keys.RIGHT:
				this.navigateHorizontal(1);
			break;
			case Keys.SELECT:
				console.log("SELECT");
			break;
		}
	},
	navigateHorizontal: function (direction) {
		var newData = this.state.data[this.state.highlightedData + direction],
			xPositions = this.state.xPositions,
			xIndex = 0;
		if (newData) {
			this.state.highlightedData = this.state.highlightedData + direction;
			if (direction < 0) {
				this.state.highlightedItem = _L.previousIndex(xPositions, this.state.highlightedItem);
			} else {
				this.state.highlightedItem = _L.nextIndex(xPositions, this.state.highlightedItem);
			}
			this.state.items.forEach(function (item, index, arr) {
				xIndex = xPositions.indexOf(item.x);
				/*if (xIndex === 0 && direction < 0) {
					arr[index] = this.state.data[this.state.highlightedData + xPositions.length - 2];
				}
				if (xIndex === xPositions.length - 1 && direction > 0) {
					arr[index] = this.state.data[this.state.highlightedData - xPositions.length + 2];
				}*/
				if (direction > 0) {
					arr[index].x = _L.previous(xPositions, xIndex);
				} else {
					arr[index].x = _L.next(xPositions, xIndex);
				}
				console.log(arr[index].x);
				// TODO: update with new data
			}, this);
			this.setState(this.state);
		}
	}
 });

module.exports = App;
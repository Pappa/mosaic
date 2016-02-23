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
				items: [{ x: this.state.xPositions[0]/*, opacity: 0 */}]
			};

		data.some(function (item, i) {
			item.x = this.state.xPositions[i + 1];
			/*item.opacity = (i >= this.state.visibleItems) ? 0 : 1;*/
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
		var newData = this.state.data[this.state.highlightedData + direction],
			xPositions = this.state.xPositions,
			xIndex = 0;
		if (newData) {
			this.state.highlightedData = this.state.highlightedData + direction;
			// TODO: fix the following line when direction === -1
			this.state.highlightedItem = (this.state.highlightedData + direction) % xPositions.length;
			this.state.items.forEach(function (item) {
				xIndex = xPositions.indexOf(item.x);
				if (direction > 0) {
					item.x = _L.previous(xPositions, xIndex);
				} else {
					item.x = _L.next(xPositions, xIndex);
				}
				// TODO: update with new data
			}, this);
			this.setState(this.state);
		}
	},
	navigateHorizontal: function (direction) {
		console.log("navigateHorizontal");
	},
 });

module.exports = App;
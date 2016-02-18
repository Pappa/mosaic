"use strict";
var React = require('react'),
	MosaicItem = require('./MosaicItem.jsx');

var MosaicRow = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlightedItem !== this.props.highlightedItem);
	},
	render: function() {
		var items = [],
			isHighlighted = false;
		this.props.assets.forEach(function (asset, i) {
			isHighlighted = (i === this.props.highlightedItem);
			items.push(<MosaicItem key={i} highlighted={isHighlighted} asset={asset} index={i} animate={this.animate} />);
		}, this);
		return (
			<div className={"mosaicRow mosaicRow_" + (this.props.index)}>
				{items}
			</div>
		);
	},
	animate: function () {
		console.log("animate called on: " + this.props.index);
	}
});

module.exports = MosaicRow;
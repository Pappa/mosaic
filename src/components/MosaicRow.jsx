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
			items.push(<MosaicItem key={i} highlighted={isHighlighted} asset={asset} index={i} />);
		}, this);
		return (
			<div className={"mosaicRow mosaicRow_" + (this.props.index)}>
				{items}
			</div>
		);
	}
});

module.exports = MosaicRow;
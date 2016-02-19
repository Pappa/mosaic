"use strict";
var React = require('react'),
	MosaicItem = require('./MosaicItem.jsx');

var MosaicRow = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlightedItem !== this.props.highlightedItem);
	},
	render: function() {
		var items = [],
			style = { top: this.props.y },
			itemProps = {};
		this.props.xPositions.forEach(function (x, i) {
			if (this.props.assets[i]) {
				itemProps = {
					key: i,
					highlighted: (i === this.props.highlightedItem),
					asset: this.props.assets[i],
					index: i,
					x: x
				};
				items.push(<MosaicItem {...itemProps} />);
			}
		}, this);
		return (
			<div style={style} className={"mosaicRow mosaicRow_" + (this.props.index)}>
				{items}
			</div>
		);
	}
});

module.exports = MosaicRow;
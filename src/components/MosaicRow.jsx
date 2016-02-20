"use strict";
var React = require('react'),
	MosaicItem = require('./MosaicItem.jsx');

var MosaicRow = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlightedItem !== this.props.highlightedItem);
	},
	render: function() {
		var items = [],
			style = {
				top: this.props.y,
				opacity: this.props.opacity
			},
			itemProps = {};
		this.props.xPositions.forEach(function (x, i, xPositions) {
			if (this.props.items[i]) {
				itemProps = {
					key: i,
					highlighted: (i === this.props.highlightedItem),
					item: this.props.items[i],
					index: i,
					x: x,
					opacity: (i === 0 || i === xPositions.length - 1) ? 0 : 1
				};
				items.push(<MosaicItem {...itemProps} />);
			}
		}, this);
		return (
			<div style={style} className="mosaicRow">
				{items}
			</div>
		);
	}
});

module.exports = MosaicRow;
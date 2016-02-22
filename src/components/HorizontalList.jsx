"use strict";
var React = require('react'),
	ListItem = require('./ListItem.jsx');

var HorizontalList = React.createClass({
	/*shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlightedItem !== this.props.highlightedItem);
	},*/
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
					item: this.props.items[i]
				};
				items.push(<ListItem {...itemProps} />);
			}
		}, this);
		return (
			<div style={style} className="list">
				{items}
			</div>
		);
	}
});

module.exports = HorizontalList;
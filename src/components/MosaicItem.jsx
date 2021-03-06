"use strict";
var React = require('react');

var MosaicItem = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlighted !== this.props.highlighted);
	},
	render: function() {
		var title = (this.props.item && this.props.item.title) ? this.props.item.title : "",
			url = (this.props.item && this.props.item.art) ? this.props.item.art.url : "",
			cssClass = "mosaicItem",
			style = {
				left: this.props.x,
				opacity: this.props.opacity
			};
		if (this.props.highlighted) {
			cssClass += " highlighted";
		}
		return (
			<div style={style} className={cssClass}>
				<img src={url} />
				<p>{title}</p>
			</div>
		);
	}
});

module.exports = MosaicItem;
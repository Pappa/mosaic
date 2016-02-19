"use strict";
var React = require('react');

var MosaicItem = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlighted !== this.props.highlighted);
	},
	render: function() {
		var title = (this.props.asset && this.props.asset.title) ? this.props.asset.title : "",
			url = (this.props.asset && this.props.asset.art) ? this.props.asset.art.url : "",
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
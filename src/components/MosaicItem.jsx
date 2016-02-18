"use strict";
var React = require('react');

var MosaicItem = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
	    return (newProps.highlighted !== this.props.highlighted);
	},
	render: function() {
		var title = (this.props.asset && this.props.asset.title) ? this.props.asset.title : "",
			url = (this.props.asset && this.props.asset.art) ? this.props.asset.art.url : "",
			cssClass = "mosaicItem mosaicItem_" + this.props.index;
		if (this.props.highlighted) {
			cssClass += " highlighted";
		}
		return (
			<div className={cssClass}>
				<img src={url} onMouseEnter={this.props.animate} />
				<p>{title}</p>
			</div>
		);
	}
});

module.exports = MosaicItem;
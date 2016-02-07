"use strict";
var React = require('react');

var MosaicItem = React.createClass({
	render: function() {
		var title = (this.props.asset && this.props.asset.title) ? this.props.asset.title : "",
			url = (this.props.asset && this.props.asset.art) ? this.props.asset.art.url : "";
		return (
			<div className={"mosaicItem mosaicItem_" + (this.props.index)}>
				<img src={url} />
				<p>{title}</p>
			</div>
		);
	}
});

module.exports = MosaicItem;
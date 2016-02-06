"use strict";
var React = require('react');

var MosaicItem = React.createClass({
	render: function() {
		return (
			<div className="mosaicItem">
				<img src="" />
				<p>El pato come pan.</p>
			</div>
		);
	}
});

var MosaicRow = React.createClass({
	render: function() {
		return (
			<div>
				<MosaicItem />
			</div>
		);
	}
});

var Mosaic = React.createClass({
	render: function() {
		return (
			<div>
				<MosaicRow />
			</div>
		);
	}
});

module.exports = Mosaic;
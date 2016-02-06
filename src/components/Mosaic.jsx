"use strict";
var React = require('react'),
	Api = require('../api/Api');

var MosaicItem = React.createClass({
	render: function() {
		return (
			<div className="mosaicItem">
				<img src={this.props.asset.art.url} />
				<p>{this.props.asset.title}</p>
			</div>
		);
	}
});

var MosaicRow = React.createClass({
	render: function() {
		var items = [];
		this.props.assets.forEach(function (asset, i) {
			if (i < 10) {
				items.push(<MosaicItem key={asset.id} asset={asset} />);
			}
		});
		return (
			<div className="mosaicRow">
				{items}
			</div>
		);
	}
});

var Mosaic = React.createClass({
	getInitialState: function() {
		return {
			catalogues: []
		};
	},

	componentDidMount: function() {
		var me = this;
		if (this.isMounted()) {
			Api.getCatalogues()
				.then(Api.getAssetsForCatalogues)
				.then(function (catalogues) {
					this.setState({ catalogues: catalogues });
				}.bind(this))
				.catch(function (error) {
					console.log(error);
				});
		}
	},
	render: function() {
		var rows = [];
		this.state.catalogues.forEach(function (catalogue) {
			rows.push(<MosaicRow key={catalogue.id} assets={catalogue.assets} />);
		});
		return (
			<div>
				{rows} 
			</div>
		);
	}
});

module.exports = Mosaic;
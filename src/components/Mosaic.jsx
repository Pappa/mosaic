"use strict";
var React = require('react'),
	Api = require('../api/Api');

var MosaicItem = React.createClass({
	render: function() {
		return (
			<div className={"mosaicItem mosaicItem_" + this.props.index}>
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
			if (i < 3) {
				items.push(<MosaicItem key={asset.id} asset={asset} index={i} />);
			}
		});
		return (
			<div className={"mosaicRow mosaicRow_" + this.props.index}>
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
		this.state.catalogues.forEach(function (catalogue, i) {
			rows.push(<MosaicRow key={catalogue.id} assets={catalogue.assets} index={i} />);
		});
		return (
			<div className="mosaic">
				{rows} 
			</div>
		);
	}
});

module.exports = Mosaic;
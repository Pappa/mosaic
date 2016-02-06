"use strict";
var React = require('react'),
	Api = require('../api/Api');

var MosaicItem = React.createClass({
	render: function() {
		return (
			<div className={"mosaicItem mosaicItem_" + (this.props.index)}>
				<img src={this.props.asset.art.url} />
				<p>{this.props.asset.title}</p>
			</div>
		);
	}
});

var MosaicRow = React.createClass({
	getInitialState: function() {
		return {
			visibleRows: 3
		};
	},
	render: function() {
		var items = [],
			emptyAsset = {
				title: "",
				art: {
					url: ""
				}
			};
		items.push(<MosaicItem key={0} asset={emptyAsset} index={0} />);
		this.props.assets.forEach(function (asset, i) {
			if (i < this.state.visibleRows) {
				items.push(<MosaicItem key={i + 1} asset={asset} index={i + 1} />);
			}
		}, this);
		return (
			<div className={"mosaicRow mosaicRow_" + (this.props.index)}>
				{items}
			</div>
		);
	}
});

var Mosaic = React.createClass({
	getInitialState: function() {
		return {
			catalogues: [],
			visibleRows: 3
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
		rows.push(<MosaicRow key={0} assets={[]} index={0} />);
		this.state.catalogues.forEach(function (catalogue, i) {
			if (i <= this.state.visibleRows) {
				rows.push(<MosaicRow key={i + 1} assets={catalogue.assets} index={i + 1} />);
			}
		}, this);
		return (
			<div className="mosaic">
				{rows} 
			</div>
		);
	}
});

module.exports = Mosaic;
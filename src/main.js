"use strict";
var React = require('react'),
	ReactDOM = require('react-dom'),
	Mosaic = require('./components/Mosaic.jsx'),
	Api = require('./api/Api');

var getData = function () {
	return Api.getCatalogues()
		.then(Api.getAssetsForCatalogues);
};

var App = React.createClass({
	render: function() {
		return (
			<Mosaic getData={getData} />
		);
	}
});

function render() {
	ReactDOM.render(
		<App />, 
		document.getElementById('app')
	);
}

document.addEventListener('DOMContentLoaded', render, false);
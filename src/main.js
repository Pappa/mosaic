"use strict";
var React = require('react'),
	ReactDOM = require('react-dom'),
	App = require('./components/App.jsx'),
	Api = require('./api/Api');

var getData = function () {
	return Api.getAssetsForCatalogue({ id: 1 });
};

function render() {
	ReactDOM.render(
		<App getData={getData} />, 
		document.getElementById('app')
	);
}

document.addEventListener('DOMContentLoaded', render, false);
"use strict";
var React = require('react'),
	ReactDOM = require('react-dom'),
	Mosaic = require('./components/Mosaic.jsx');


var App = React.createClass({
	render: function() {
		return (
			<Mosaic />
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
"use strict";
var React = require('react'),
	ReactDOM = require('react-dom'),
	Mosaic = require('./components/Mosaic');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<Mosaic />
			</div>
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
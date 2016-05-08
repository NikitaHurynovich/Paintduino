var React = require('react');
require('./index.css');
var {Grid} = require('react-bootstrap');
var Footer = React.createClass({

	render: function() {
		return <footer>
		<Grid>footer information is here</Grid>
		</footer>
	}

});

module.exports = Footer;
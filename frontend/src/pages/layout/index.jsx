var React = require('react');

var { RouteHandler, Navigation } = require('react-router');

var { Grid, Button , Label, ListGroup, ListGroupItem, Input, Navbar, Nav, NavItem } = require('react-bootstrap');

var Menu = require('blocks/menu/index.jsx');

require('./index.css')
var Layout = React.createClass({
	mixins : [Navigation],
	render: function() {
		return <div>
			<Grid>
				<RouteHandler />
			</Grid>
		</div>
	}

});

module.exports = Layout;
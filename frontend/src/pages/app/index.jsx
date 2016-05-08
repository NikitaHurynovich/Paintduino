var React = require('react');

var { RouteHandler } = require('react-router');

var { Grid, Button , Label, ListGroup, ListGroupItem, Input, Navbar, Nav, NavItem } = require('react-bootstrap');

var { Authentication } = require('utils/auth');

var { auth } = require('utils/auth');

var Menu = require('blocks/menu/index.jsx');

var Footer = require('blocks/footer/index.jsx')

var http = require('utils/http');

var App = React.createClass({
	componentWillMount: function() {
		this.onChange = auth.onChange;
	},
	
	onChange : function(user){
		this.setState({
			user : user
		})
	},

	componentDidMount: function() {
		auth.loggedIn((user) => {
			this.setState({ user : user })
		});
	},
	
	logout : function(){
		this.setState({ user : null });
		window.location = '#/';
	},
	
	login : function(form){
		http.post('/api/login', form)
			.then(() => {
				window.location = '/';
			})
	},

	getInitialState: function() {
		return {
			user : null 
		};
	},
	//mixins : [Authentication],
	render: function() {
		return <div>
			<RouteHandler user={this.state.user}/>
		</div>
	}

});

module.exports = App;
var React = require('react');
var Router = require('react-router');

var { Route, Link, State, Redirect,
	Navigation, RouteHandler, 
	DefaultRoute } = Router;

var Layout = require('pages/layout/index.jsx');
var Dashboard = require('pages/dashboard/index.jsx');


var App = require('pages/app/index.jsx');


//add-project
var routes = (
	<Route  path="/">
		<Route handler={Dashboard}>
		</Route>
	</Route>);


module.exports = {
	run : function(){
		Router.run(routes, function (Handler) { 
			React.render(<Handler />, document.getElementById('app'));
		});
	}
}
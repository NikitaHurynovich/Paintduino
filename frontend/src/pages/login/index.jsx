var React = require('react');

var { Grid, Row, Col, Button , Label, TabbedArea, TabPane, ListGroup, ListGroupItem, Input } = require('react-bootstrap');
var { Navigation } = require('react-router');
var http = require('utils/http');
require('./index.css');


var { auth } = require('utils/auth');


var LoginForm = React.createClass({
	mixins : [Navigation, React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			email : 'test@test.com',
			password : 'qwer1234' 
		};
	},
	login : function(){
		auth.login(this.state.email, this.state.password, (login)=>{
			if (login) this.transitionTo('/');
		})
	},
	render : function(){
		return <form className="login-form">
			<Input valueLink={this.linkState('email')} type="text" label="email" />
			<Input valueLink={this.linkState('password')} type="password" label="password" />
			<Button onClick={this.login} bsStyle="primary">login</Button>
		</form>
	}
})

var RegisterForm = React.createClass({
	mixins : [Navigation, React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			email : '',
			name : '',
			password : '' 
		};
	},
	regist : function(){
		http.post('/api/users', this.state)
			.then(() => this.transitionTo('/'))
	},
	render : function(){
		return <form className="login-form">
			<Input valueLink={this.linkState('email')} type="text" label="email" />
			<Input valueLink={this.linkState('password')} type="password" label="password" />
			<Input valueLink={this.linkState('name')} type="text" label="name" />
			<Button onClick={this.regist} bsStyle="success">regist</Button>
		</form>
	}
})

var login = React.createClass({

	render: function() {
		return <Grid>
			<Row>
				<Col xsOffset={4} xs={4}>
					<TabbedArea defaultActiveKey={1}>
				    	<TabPane eventKey={1} tab='login'>
					    	<LoginForm/>
					    </TabPane>
					    <TabPane eventKey={2} tab='regist'>
							<RegisterForm/>
					    </TabPane>
					</TabbedArea>
				</Col>
			</Row>
		</Grid>
	}

});

module.exports = login;
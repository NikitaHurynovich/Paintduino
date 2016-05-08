var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, Input, FormControls, Alert } = require('react-bootstrap');

var cx = require('classnames');

var http = require('utils/http');

require('./index.css');

var Registr = React.createClass({
	mixins : [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			accountType : 'client' ,
			email : '',
			password : '',
			retype_password : '',
			isRegister : false
		};
	},
	createAccount : function(){
		const data = {
			email : this.state.email,
			password : this.state.password
		}
		http.post('/api/users', data)
			.then(() => this.setState({ isRegister : true }))
	},
	render: function() {
		

		const buttonDisabled = this.state.password!='' && this.state.password != this.state.retype_password;

		let form = (
			<form>
	
				<Input valueLink={this.linkState('email')} type="email" label="Email" />
				<Input valueLink={this.linkState('password')} type="password" label="Password" />
				<Input valueLink={this.linkState('retype_password')} type="password" label="Retype password" />
				<Button onClick={this.createAccount} disabled={buttonDisabled}>Create Account</Button>
			</form>
		);

		if (this.state.isRegister){
			form = (<div>
				<Alert bsStyle="success">
				    Account create <strong>success</strong>.
				    <p>Now you can login as <strong>{this.state.email}</strong></p> 
				</Alert>
			</div>);
		}

	

		return <div>
			<Grid>
				<Row>
					<Col xs={4}>
						{form}
					</Col>
					
				</Row>
			</Grid>
		</div>
	}

});

module.exports = Registr;
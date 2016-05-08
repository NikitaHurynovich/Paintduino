var React = require('react');
var io = require('socket.io-client');
var http = require('../../utils/http.jsx');
var Select = require('react-select');//
var {paper} = require('paper');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, DropdownButton, MenuItem,  ButtonToolbar, Badge} = require('react-bootstrap');


var { Navigation, Link } = require('react-router');

require('./index.css');
require('./bootstrap.min.css');
var CirclesMas = [];

function file(params) {
	return require('./' +params);
}

function getRadius(pressure){
	if(pressure == 18){
		return 90;
	} else if(pressure == 17){
		return 80; 
	}else if(pressure == 12){
		return 50; 
	}else if(pressure == 10){
		return 40; 
	}else if(pressure == 9){
		return 30; 
	} else{
		return 0;
	}
}

function getColor(params) {
	let value = parseInt(params);
	switch(value){
		case 0:{
			return '#C32922';
			
		}
		case 1:{
			return '#F9F81F';
			
		}
		case 2:{
			return '#6CF91F';
		}
		case 3:{
			return '#1FF9D1';
			
		}
		case 4:{
			return '#1F58F9';
		}
		case 5:{
			return '#DE3BD9';
			
		}
		default:
			return 'black';
		
		
	}
}



var DashBoard = React.createClass({
	getInitialState(){
		return {
			ports:[],
			selected:{}
		}
	},

	componentDidMount(){
		var canvas = document.getElementById('myCanvas');
		
		paper.setup(canvas);
		paper.view.draw();
		
		
		
		
		
		var socket = io.connect('http://localhost:7000');
		socket.on('serialports',  (data) => {
			console.log(data);
			this.setState({ports:data});
		});

		socket.on('data', function (data) {
			console.log(data);
			
			var z = getRadius(data.z);
			if(z != 0){
				var x = data.x > 400 ? 0: data.x;
				var circle = new paper.Path.Circle(new paper.Point(4.668*data.y -303.4,-2.43*x +850),z);
				circle.fillColor= getColor(data.c);
				CirclesMas.push(circle);
				if(CirclesMas.length >= 10){
					paper.view.draw();
					CirclesMas = [];
				}
				
			} else{
				paper.project.clear();
				paper.view.draw();
			}
			

		});


	},
	
	onChange(val){
		console.log(val);
		this.setState({selected:val});	
	},
	
	onSend(){
		http.post('/api/serialport',{name:this.state.selected}).then((res)=>this.setState({selected:null}));
	},
	
	onFullscreen(e){
		console.log(e);
		 if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
		
	},
	

	render: function() {
		
		
		
		var options = [];
		this.state.ports.forEach((item) =>{
			options.push({
				value :item,
				label :item
			});

		});
		

		var Menu;
		if(this.state.selected != null){
		
		Menu = <Row className="sw">
			<Col lg={5} md={5} lgOffset={3} mdOffset={3}>
				<Select
				name="comport-select"
				value="Serial ports"
				searchable= {false}
				clearable={false}
				onChange={this.onChange}
				options={options}/>
			</Col>
			<Col lg={2} md={2}>
				<Button onClick={this.onSend}>Choose</Button>
			</Col>
		</Row>
		} else{
			Menu = <Row className="sw" style={{textAlign:"center"}}>
			<Col md={12} lg={12} sm= {12} xs={12}>
				<span className="home_title">Paint started!</span>
			
				<div className="fullscreenBtn" onClick={this.onFullscreen}>
					<input type="text" tabindex="-1" role="presentation" />
				</div>
			</Col>
			</Row>
		}
		
		return <div id="myApp">
			<Grid fluid>
				{Menu}

				<Row><Col lg={12} md={12}> <canvas id="myCanvas" ></canvas></Col></Row>
			</Grid>
		</div>

	}

});

module.exports = DashBoard;
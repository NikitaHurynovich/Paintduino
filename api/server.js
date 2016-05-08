var config = require('./config.json');
var socket = {};
var serialports = [];
var listenSerialport = null;


var express = require('express');
var app = express();

app.use(express.static('../frontend/dist'));

app.use(require('cookie-parser')());
app.use(require('cookie-session')({
    secret: config.secret
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var sp = require('serialport');


var router = express.Router();


router.post('/api/serialport',function(req,res){

	if(listenSerialport == null) {
		var nameOfPort = req.body.name;
		serialports.forEach((item)=> {
			if(item === nameOfPort){
				listenSerialport = new sp.SerialPort(nameOfPort,{baudRate:19200,parser: sp.parsers.readline('\n')});
				listenSerialport.on('open', function () {
					console.log("OPEN port" + nameOfPort);

				});

				listenSerialport.on('data', function (data) {
					try{
						var  serialData = JSON.parse("" +data);
						socket.emit('data',serialData);

					} catch (SyntaxError){
						console.log("Error");
					}

				});
			}
		});
		res.send({status:"OK"});
	} else if(!res.finished)
		res.send({status:"ERROR"});


});

app.use(router);

sp.list(function(err, ports) {
	ports.forEach((item)=>{
		serialports.push(item.comName);
	});
	console.log(serialports);
});



var server = require('http').createServer(app);
var io = require('socket.io')(server);

//io.set('transports', [
//	'websocket'
//	, 'flashsocket'
//	, 'htmlfile'
//	, 'xhr-polling'
//	, 'jsonp-polling'
//]);
io.on('connection', function (sock) {
	socket = sock;
	socket.emit('serialports',serialports);
	console.log('connection');
});

//
//socket.on('disconnect', function(){});
server.listen(7000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});







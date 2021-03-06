require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

//define the port
app.set('port', 3000);

//add middleware to console log every request
app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

//set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//enable parsing of posted routes
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

//add routing
app.use('/api', routes);

//listen for requests
var server = app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

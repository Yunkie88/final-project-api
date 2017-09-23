var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongo = require ('./controller/puff.js');
var auth = require('./controller/auth.js')();

app.use('/api',mongo);
app.use(auth.initialize());


app.listen (process.env.PORT||8080);

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds133084.mlab.com:33084/puff')

module.exports = app; 
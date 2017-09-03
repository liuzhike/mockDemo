var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
/*引入api*/
var api = require('./config/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置请求
app.get('/', function(req, res){
    res.send('hello world');
});
app.get('/api/*', api.get);
app.post('/api/*', api.post);
app.options('/api/*', function(req, res, next){
    res.sendStatus(200);/*让options请求快速返回*/
});

module.exports = app;

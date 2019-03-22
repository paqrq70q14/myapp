const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');


let employee = require('./routes/employee');
let product = require('./routes/product');

let app = express();

// 配置session 
app.use(session({
    secret: 'myRent-secret',
    name: 'myRent-name',
    cookie: {maxAge: 8000000000},
    resave: false,
    saveUninitialized: true
}));


app.use(function (req, res, next){
    let url = req.originalUrl;
    // 如果用户没有携带sessionId 则跳转回login.html
    if (!req.session.employee
        && ((url.indexOf('/admin') > -1 && url.indexOf('.html') > -1) || url == '/admin/' )
        && url.indexOf('/admin/login.html') == -1) {
        return res.redirect('/admin/login.html');
    }
    next();
})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  app.all('*',function(req,res,next){
//  res.header('Access-Control-Allow-Origin','*');
//  next();
//  });


// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.use('/product', product);
app.use('/employee', employee);



module.exports = app;

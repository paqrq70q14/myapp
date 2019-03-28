const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const multiparty = require('multiparty');
const util =require('util');
const db = require('./mongo/dbb.js')

const http = require('http');

let employee = require('./routes/employee');
let product = require('./routes/product');

let app = express();


var port = "3307";

// Create Server
var server = http.createServer(app);

// Listen 
server.listen(port, function (err) {
    console.log("http://localhost:3307");

});
// 配置session 
app.use(session({
    secret: 'myRent-secret',
    name: 'myRent-name',
    cookie: { maxAge: 8000000000 },
    resave: false,
    saveUninitialized: true
}));


// app.use(function (req, res, next){
//     let url = req.originalUrl;
//     // 如果用户没有携带sessionId 则跳转回login.html
//     if (!req.session.employee
//         && ((url.indexOf('/admin') > -1 && url.indexOf('.html') > -1) || url == '/admin/' )
//         && url.indexOf('/admin/login.html') == -1) {
//         return res.redirect('/admin/login.html');
//     }
//     next();
// })
app.post('/back/upload', function (req, res) {
    console.log(111);
    let pro = {};
    var form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        console.log('fields=', fields);
        console.log('files=',files);
        pro.proName = fields.proName[0];
        pro.proDesc = fields.proDesc[0];
        pro.address = fields.address[0];
        pro.rentPrice = fields.rentPrice[0];
        pro.picAddr = files.pic[0].path;
        pro.male = fields.sex.find(function(v,i,arr){
            return v == 'male=1'}) || 'male= 0 ';
       
        pro.female = fields.sex.find(function(v,i,arr){
            return v == 'female=1'}) || 'female= 0 ';    
        pro.bathroom = fields.feature.find(function(v,i,arr){
            return v == 'bathroom=1'}) || 'bathroom= 0 ';
        pro.shortRent = fields.houseType.find(function(v,i,arr){
            return v == 'shortRent=1'}) || 'shortRent=0';
        pro.shareHouse = fields.houseType.find(v=> v=='shareHouse = 1') || 'shareHouse = 0';
        pro.sublet = fields.houseType.find(v=> v=='sublet=1') || 'sublet=0';
        pro.longtermRent = fields.houseType.find(v=> v=='longtermRent=1') || 'longtermRent=0';
        pro.ownerRent = fields.houseType.find(v=> v=='ownerRent=1') || 'ownerRent=0';

        console.log(pro);                 
        })
        db.addProduct(pro, function(err, data){
            let result = data;
            console.log(result);
        res.redirect('/back/product.html');
    })
})

    


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static('upload'));
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





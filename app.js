const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const multiparty = require('multiparty');
const db = require('./mongo/dbbb.js');
const ObjectId = require('mongodb').ObjectId;
const Page = require('./models/page.js');
const qs = require('qs');
const http = require('http');


let employee = require('./routes/employee');

let app = express();


var port = "3307";


// Create Server
var server = http.createServer(app);

// Listen 
server.listen(port, function (err) {
    console.log("http://localhost:3307");

});
// 配置session 
// app.use(session({
//     secret: 'myRent-secret',
//     name: 'myRent-name',
//     cookie: { maxAge: 8000000000 },
//     resave: false,
//     saveUninitialized: true
// }));


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




// 添加房屋数据
app.post('/uploadProduct', function (req, res) {
    console.log('来了！');
    let pro = {};
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req, function (err, fields, files) {

        if (err) {
            console.log(err);
        }
        console.log('fields =', fields);
        console.log('files =',files.pic.length);
        pro = {
          proName : fields.proName[0],
          proDesc : fields.proDesc[0],
          address : fields.address[0],
          rentPrice : fields.rentPrice[0],
          picAddr : files.pic[0].path || '',
        }

        // 性别筛选
        if(fields.sex) {
            pro.sex = fields.sex[0];
        }
 
        // 房屋特色：短租 独卫
        
        if(fields.shortRent) {
            pro.shortRent = fields.shortRent[0] 
        }
        if(fields.bathroom) {
            pro.bathroom = fields.bathroom[0]
        }


        // 房屋类型：合租 转租 业主 长租
        if(fields.shareHouse) {
            pro.shareHouse = fields.shareHouse[0];
        }
        if(fields.sublet) {
            pro.sublet = fields.sublet[0];
        }
        if(fields.ownerRent) {
            pro.ownerRent = fields.ownerRent[0];
        }
        if(fields.longRent) {
            pro.longRent = fields.longRent[0];
        }

        // 房屋户型：X卧室X厅X卫生间
        if(fields.bedroom){
            pro.bedroom = fields.bedroom[0];
        }
        if(fields.livingRoom){
            pro.livingRoom = fields.livingRoom[0];
        }
        if(fields.totalBathroom){
            pro.totalBathroom = fields.totalBathroom[0];
        }
      
    
            console.log('pro =',pro);
            
        if(pro.proName) {

            db.insertOne('product',pro,function(err,data){
                let result = data;
                console.log(result);
            })
        
            res.redirect('/back/product.html');  
        }


   })
    
    
})


// 根据id删除某一条数据
app.get('/delProduct', function(req, res){
    
    db.deleteOne('product', {_id:ObjectId(req.query.id)}, function(err, data){
        let result = data;
        if(result) {
            res.send({"success":"400"});
        }
    })

    
})

// 修改数据
app.post('/updateProduct', function(req, res) {
    console.log('来了！');
    let pro = {};
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        console.log('fields =', fields);
        console.log('files =',files);
        pro = {
            id: fields.id[0],
            proName : fields.proName[0],
            proDesc : fields.proDesc[0],
            address : fields.address[0],
            rentPrice : fields.rentPrice[0],
            picAddr : files.pic[0].path || '',
          }
  
          // console.log('files.pic[0].path = ',files.pic[0].path);
          // 性别筛选
  
          if(fields.sex) {
              pro.male = fields.sex.find(function(v,i,arr){
                  return v == 'male=1'}) || 'male= 0 ';
              pro.female = fields.sex.find(function(v,i,arr){
                  return v == 'female=1'}) || 'female= 0 ';                  
          }
   
          // 房屋特色：短租 独卫
          if(fields.houseFeature) {
              pro.bathroom = fields.houseFeature.find(function(v,i,arr){
                  return v == 'bathroom=1'}) || 'bathroom= 0 '
              pro.shortRent = fields.houseFeature.find(function(v,i,arr){
                  return v == 'shortRent=1'}) || 'shortRent=0' 
          }
  
  
          // 房屋类型：合租 转租 业主 长租
          if(fields.houseType) {
              
              pro.shareHouse = fields.houseType.find(v => {return v == "shareHouse=1";});
              if(pro.shareHouse == undefined){
                  pro.shareHouse = "shareHouse=0"
              }
              pro.sublet = fields.houseType.find(v => {return v == "sublet";});
              if(pro.sublet == undefined){
                  pro.sublet = "sublet=0"
              }
              pro.longtermRent = fields.houseType.find(v => {return v == "longtermRent";});
              if(pro.longtermRent == undefined){
                  pro.longtermRent = "longtermRent=0"
              }
              pro.ownerRent = fields.houseType.find(v => {return v == "ownerRent=1";});
              if(pro.ownerRent == undefined){
                  pro.ownerRent = "ownerRent=0"
              }         
      }
            
            
          console.log('pro.id=', pro.id);
          
          db.update('product',{_id: ObjectId(pro.id)}, pro, function(err, data){
                let result = data;
                if(result){
                    console.log('修改成功！');
                }
            })
            res.redirect('/back/product.html');  

   })
})

// 查询房屋总数居
app.get('/queryProducts', function(req, res){
    
    let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    db.query('product',{},function(err, data){
        let result = data;
        page.result = result;
        if(data) {
            page.total = data.length;
        }
        res.send(page);
    })

})
// 根据id查询数据
app.get('/queryProductById', function(req, res){
    let page = {};
    console.log(123);
    db.query('product',{_id:ObjectId(req.query.id)}, function(err, data){
        let result = data;
        res.send(result);
    })
})

// 根据地址查询某一条数据
app.get('/queryByLocation', function(req, res) {
    console.log('来了')
    // let key = req.query.key;
    let key = RegExp(req.query.key);
    console.log('key=',key);   
    let pro = {
        address: key || ''
    }
    let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    db.query('product', pro, function(err, data){
        let result = data;
        page.result = result;
        if(data) {
            page.total = data.length;
        }
        res.send(page);
    })
    

})

// 条件筛选接口
app.get('/queryByOptions', function(req, res){
    console.log('来了')
    let params = req.query;
    console.log('params =',params);
    // 分页
        let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    let arr = [];
    for (var k in params) {
    //    console.log(params[k]);
    // let abc =  '{'+ k + ':' +'"'+params[k]+'"'+'}';
    // {female:female=1}
    let abc =  '{'+ k +':'+ '"'+ params[k] +'"'+ '}';
    console.log('abc=', abc);
    abc1 = eval("("+abc+")");
    console.log('abc=1',abc1)
    arr.push(abc1);
    }
    console.log(arr);

    db.query('product',{$and:arr},function(err, data){
        let result = data;
        if(result){
            console.log('查询成功！');
            page.result = result;
            res.send(page);
        }
    })
})

// 筛选房屋
app.get('/queryRoomType', function(req, res){
    console.log('来了')
    let params = req.query;
    console.log('params =',params);

    // 分页
        let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    let arr = [];
    for (var k in params) {
    //    console.log(params[k]);
    // let abc =  '{'+ k + ':' +'"'+params[k]+'"'+'}';
    // {female:female=1}
    let abc =  '{'+ k +':'+ '"'+ params[k] +'"'+ '}';
    console.log('abc=', abc);
    abc1 = eval("("+abc+")");
    console.log('abc=1',abc1)
    arr.push(abc1);
    }
    console.log(arr);

    db.query('product',{$and:arr},function(err, data){
        let result = data;
        if(result){
            console.log('查询成功！');
            page.result = result;
            res.send(page);
        }
    })
})






    


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// 配置静态服务
app.use('/back/upload', express.static('upload'));
app.use('/front/upload', express.static('upload'));

//  app.all('*',function(req,res,next){
//  res.header('Access-Control-Allow-Origin','*');
//  next();
//  });

app.use('/employee', employee);





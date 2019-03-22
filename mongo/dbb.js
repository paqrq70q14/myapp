
// 配置数据库连接地址
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const constr = 'mongodb://47.102.194.63:27017';
const objectId = require('mongodb').ObjectId;
// let multipart = require('connect-multiparty');
// let multipartMiddleware = multipart();


 module.exports = {
    // 查询用户方法
    queryUser(username, callback){
        mongoClient.connect(constr, function(err, client) {
            let db = client.db('rent');
            // 获取集合对象
            let users = db.collection('bbb'); 
            users.find({"name":username}).toArray(function(err, data){
                if(data.length == 0){
                    // console.log("没有查询到");
                    return callback(err);
                }
                let result = data[0];
                
                callback(err, result);
            });

            // 断开数据库(释放连接)
            client.close();
        })  


    },
    
    // 查询房屋总数量方法
    queryProductCount(callback){
        mongoClient.connect(constr, function(err,client){
            let db = client.db('rent');
            // 获取房屋集合对象
            let products = db.collection('product');
            products.find({}).toArray(function(err, data){
                if(data.length == 0){
                    // console.log("没有查询到");
                    return callback(err);
                }
                let result = data.length;
                // console.log(result);
                return callback(err,result)
                client.close();
            })
        })
    },
    // 根据id查询房屋
    queryProductById(id, callback){
        mongoClient.connect(constr, function(err, client){
            let db = client.db('rent');
            let products = db.collection('product');
            products.find({_id: ObjectId(id)}).toArray(function(err, data){
                callback(data[0]);
            }) 
          })
    },
    // 查询拼接字符串房屋方法
    queryProductDetailsByparams(str,callback){
        mongoClient.connect(constr,function(err, client){
            let db = client.db('rent');
            let products = db.collection('product');
            console.log('查询的str=',str);
            products.find(str).toArray(function(err, data){
              if(!data){
                  // console.log("没有查询到");
                  return callback(err);
              }
              let result = data;
              return callback(err,result);
            //   console.log(result);
              client.close();
            })
        })
      },
    // queryProductDetails(callback){
    //     mongoClient.connect(constr, function(err, client){
    //         let db = client.db('product');
    //         let products = db.collection('product');
    //         products.find({}).toArray(function(err, data){
    //           if(!data){
    //               // console.log("没有查询到");
    //               return callback(err);
    //           }
    //           let result = data;
    //           return callback(result);
    //         //   console.log(result);
    //           client.close();
    //         })
    //     })
    //   },
    
    // 添加房屋信息功能
   queryProductDetails(params,callback){
        mongoClient.connect(constr, function(err, client){
            let db = client.db('rent');
            let products = db.collection('product');
            
            products.find({proName:params}).toArray(function(err, data){
              if(!data){
                  // console.log("没有查询到");
                  return callback(err);
              }
              let result = data;
              return callback(err,result);
            //   console.log(result);
              client.close();
            })
        })
      },
   addProduct(pro,callback){
        mongoClient.connect(constr, function(err, client){
           let db = client.db('rent');
           let products = db.collection('product');
           products.insertOne({"proName":pro.proName,"proDesc":pro.proDesc,
                                "address":pro.address,"rentPrice":pro.rentPrice},
               function(err, data){
                   if(err){
                       callback(err);
                   }             
                   var addResult = data.result;
                   console.log(addResult);                 
               })
        })
      }  
    

      


        //   let args = arguments;
        //   let DBstr = args[0];
        //   let callback;
    // 当用户传递了两个参数，那么第一个是操作字符，第二个是回调函数
        //   if (args.length === 2 && typeof args[1] === 'function') {
        //       callback = args[1];
        //   } else if (args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function'){
        //       params = args[1];
        //       callback = args[2];
        //   } else {
        //       throw new Error('参数个数不匹配');
        //   }

 }
 






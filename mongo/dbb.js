
// 配置数据库连接地址
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const constr = 'mongodb://47.102.194.63:27017';
const objectId = require('mongodb').ObjectId;
const multiparty = require('multiparty');



// 添加功能 
// function addProduct(pro, callback) {
//     console.log(pro);
//     mongoClient.connect(constr, function (err, client) {
//         let db = client.db('rent');
//         let products = db.collection('product');
//         products.insertOne(pro, function (err, data) {
//                 if (err) {
//                     callback(err);
//                 }
//                 var addResult = data.result;
//                 console.log(addResult);
//             })
           
//     })
// }


// 查询结果长度
// function queryProductCount(callback) {
//     mongoClient.connect(constr, function (err, client) {
//         let db = client.db('rent');
//         // 获取房屋集合对象
//         let products = db.collection('product');
//         products.find({}).toArray(function (err, data) {
//             if (data.length == 0) {
//                 // console.log("没有查询到");
//                 return callback(err);
//             }
//             let result = data.length;
//             // console.log(result);
//             return callback(err, result)
//             client.close();
//         })
//     })
// }


// 查询id接口
// function queryProductById(pro, callback) {
//     mongoClient.connect(constr, function (err, client) {
//         let db = client.db('rent');
//         let products = db.collection('product');
//         console.log(pro.id);
//         // ObjectId("5c9b53c4c8fa63101cea8053")
//         products.find({ _id: ObjectId(pro.id)}).toArray(function (err, data) {
//             callback(err,data[0]);
//         })
//     })
// }

// function queryAllProducts(pro,callback) {
//     mongoClient.connect(constr, function (err, client) {
//         let db = client.db('rent');
//         // 获取房屋集合对象
//         let product = db.collection('product');
//         console.log(pro);
//         product.find(pro).toArray(function (err, data) {
//             if (data.length == 0) {
//                 // console.log("没有查询到");
//                 return callback(err);
//             }
//             let result = data;
//             return callback(err, result);
//             client.close();
//         })
//     })
// }

// queryAllProducts(pro,function(err, data){
//     let result = data;
//     console.log(result);
// })


module.exports = {



    // 查询用户方法
    queryUser(username, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('users');
            // 获取集合对象
            let users = db.collection('users');
            users.find({ "username": username }).toArray(function (err, data) {
                if (data.length == 0) {
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

    // 查询房屋
    queryAllProducts(pro,callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            // 获取房屋集合对象
            let product = db.collection('product');
            console.log(pro);
            product.find(pro).toArray(function (err, data) {
                if (data.length == 0) {
                    // console.log("没有查询到");
                    return callback(err);
                }
                let result = data;
                return callback(err, result);
                client.close();
            })
        })
    },
    
    // 查询筛选方法
    queryProductDetailsByparams(str, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');
            console.log('查询的str=', str);
            products.find(str).toArray(function (err, data) {
                if (!data) {
                    // console.log("没有查询到");
                    return callback(err);
                }
                let result = data;
                return callback(err, result);
                //   console.log(result);
                client.close();
            })
        })
    },

    
    queryProductDetails(params, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');

            products.find({ proName: params }).toArray(function (err, data) {
                if (!data) {
                    // console.log("没有查询到");
                    return callback(err);
                }
                let result = data;
                return callback(err, result);
                //   console.log(result);
                client.close();
            })
        })
    },
    // 添加房屋信息功能
    addProduct(pro, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');
            products.insertOne(pro, function (err, data) {
                    if (err) {
                        callback(err);
                    }
                    var addResult = data.result;
                    console.log(addResult);
                    client.close();
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







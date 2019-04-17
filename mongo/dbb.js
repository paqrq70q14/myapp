
// 配置数据库连接地址
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const constr = 'mongodb://47.102.194.63:27017';




// function queryProductByparams(json, callback){
//     mongoClient.connect(constr, function (err, client) {
//         let db = client.db('rent');
//         let products = db.collection('product');
//         products.find(json).toArray(function (err, data) {
//             callback(err,data);
//         })
//     }) 
// }
// let reg = RegExp('池袋');
// console.log(reg);
// let params = {
//     address: reg,
//     sublet: 0,
// }

// let str = '{$or:[hello]}';
// let str1 = '';
// for (var k in params) {
//    console.log(params[k]);
// //    str1 += '{'+ k + ':' +'"'+params[k]+'"'+'}'+',';
//    str1 += '{'+ k + ':'+params[k]+'}'+',';
// }

// str1 = str1.substring(0, str1.length - 1);
// console.log('str1=',str1);
// str2 = str.replace(/hello/, str1);
// // str2 = eval("(" + str2 + ")");
// console.log('str2 =', str2);

// queryProductByparams(str2, function(err, data){
//     let result = data;
//     console.log(result);
// })

module.exports = {


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
                    callback(addResult);
                    client.close();
                })
            
        })
    },

    // 根据id删除
    delProductById(id, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');
            // ObjectId("5c9b53c4c8fa63101cea8053")
            products.remove({ _id: ObjectId(id)}, function (err, data) {
                callback(err,data);
            })
        })
    },


    // 更新房屋信息:
    updateProduct(pro, callback) {
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');
            products.update({_id: ObjectId(pro.id)}, pro, function (err, data) {
                    if (err) {
                        callback(err);
                    }
                    
                    callback(err, data);
                    client.close();
                })
            
        })
    },

    // 查询管理员方法
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

    // 查询所有房屋数据
    queryAllProducts(pro,callback) {
        mongoClient.connect(constr, function (err, client) {
            if(err){
                callback(err);
            }
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

    // 根据id查询
    queryProductById(pro, callback) {
       mongoClient.connect(constr, function (err, client) {
        let db = client.db('rent');
        let products = db.collection('product');
        // ObjectId("5c9b53c4c8fa63101cea8053")
        products.find({ _id: ObjectId(pro.id)}).toArray(function (err, data) {
            callback(err,data[0]);
        })
    })
},
    // 根据字段查询
    queryProductByKeyword(keyword, callback){
        mongoClient.connect(constr, function (err, client) {
            let db = client.db('rent');
            let products = db.collection('product');
            products.find(keyword).toArray(function (err, data) {
                callback(err,data);
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
    }
    

}







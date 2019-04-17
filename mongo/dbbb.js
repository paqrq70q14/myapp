
var MongoClient=require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var DbUrl='mongodb://47.102.194.63:27017';


function  __connectDb(callback){

    MongoClient.connect(DbUrl,function(err,client){
        if(err){
            console.log('数据库连接失败');
            return;
        }
        let db = client.db('rent');
        callback(db);
    })

}
function query(collectionname,json,callback){

    __connectDb(function(db){


        var result=db.collection(collectionname).find(json);

        result.toArray(function(error,data){

           
            callback(error,data);
        })

    })

}

// let params = {
//     proName:'大宝贝323',
//     address:'232',
//     sublet:'0'
// }
// let arr = [];
// // let str = '{$or:[hello]}';
// // {proName:'大宝贝323'}
// let str1 = '';
// for (var k in params) {
// //    console.log(params[k]);
//    let abc =  '{'+ k + ':' +'"'+params[k]+'"'+'}';
//    abc = eval("("+abc+")");
//     // abc = JSON.parse(abc);
//     // console.log('abc=',abc);
//     arr.push(abc);
// }
// console.log(arr);
// let pro = {$or:[{proName:'大宝贝323'},{address:'232'}]}

// query('product',{$or:arr},function(err, data){
//     let result = data;
//     console.log(result);
// })

module.exports = {

    // 添加一条数据
    insertOne(collectionname,json,callback){

        __connectDb(function(db){
            db.collection(collectionname).insertOne(json,function(err, data){
                callback(err, data);
            })
        })
    
    },
    // 删除一条数据
    deleteOne(collectionname,json,callback){
        __connectDb(function(db){
            db.collection(collectionname).deleteOne(json,function(error,data){
                callback(error,data);
            })
        })
    },
    update(collectionname,json1,json2,callback){

        __connectDb(function(db){
            db.collection(collectionname).updateOne(json1,{$set:json2},function(err, data){
                
                callback(err,data);
            })
        })
    
    },
    // 查询数据
    query(collectionname,json,callback){

        __connectDb(function(db){
    
    
            var result=db.collection(collectionname).find(json);
    
            result.toArray(function(error,data){
    
               
                callback(error,data);
            })
    
        })
    
    }

    
}

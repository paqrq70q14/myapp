let db = require('../mongo/dbb');
let moment = require('moment');

// 
function Product(pro) {
    this.proName = pro.proName;
    this.rentPrice = pro.rentPrice;
    this.address = pro.address;

}
// var reg = new RegExp('池袋');

// 查询房屋总条数
Product.queryProductsAll = function(pro,callback) {
  db.queryAllProducts(function(err, data){
    if(data.length == 0){
        // console.log("没有查询到");
        return callback(err);
    }
    let result = data;
    callback(err,result);
   
  })

}


// 根据拼接字符串查询
Product.queryProductByParams = function(str, callback){
    db.queryProductDetailsByparams(str, function(err,data){
        if(err){
            return callback(err);
        }
        let result = data;
        return callback(result);
    })        
    
}
// 根据id查询房屋
Product.queryProductById = function(id, callback) {
    db.queryProductById(id, function(err, data){
        if(err) {
            return callback(err);
        }
        let result = data;
        return callback(result);
    })
}

// 查询房屋细节
Product.queryAllProducts = function(reg, callback) {
  db.queryAllProducts(reg, function(err, data){
      if(err){
          return callback(err);
      }
      let result = data;
      return callback(err,result);
  })
},

// 添加房屋功能
Product.addProduct = function(pro, callback){
    console.log("hello");
    db.addProduct(pro, function(err, data){
        if(err){
            callback(err);
        }
        let addResult = data;
        callback(addResult);
    
    })
}


module.exports = Product;
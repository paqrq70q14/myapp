const express = require('express');
const router = express.Router();
const Page = require('../models/page.js');
const Product = require('../models/product');

//获取筛选房屋结果
router.get('/housedetail', function (req, res) {

    let params = {
        male: req.query.male || '0',
        female: req.query.female || '0',
        shortRent: req.query.shortRent || '0',
        bashroom: req.query.bashroom || '0',
        shareHouse: req.query.shareHouse || '0',
        sublet: req.query.sublet || '0',
        ownerRent: req.query.ownerRent || '0',
        longtermRent: req.query.longtermRent || '0'
    }
    let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })

    let str = '{$or:[hello]}';
    let str1 = '';
    for (var k in params) {
        console.log('params[k]', params[k]);
        str1 += '{' + k + ':' + params[k] + '}' + ',';
    }
    str1 = str1.substring(0, str1.length - 1);
    console.log(str1);
    str2 = str.replace(/hello/, str1);
    str2 = eval("(" + str2 + ")");

    Product.queryProductByParams(str2, function (data) {
        let result = data;
        console.log('result=',result);
        page.result = result;
        res.send(page);

    })
       
    // res.send("success");
})


router.get("/queryProductDetailsList", function (req, res) {
    // 创建Product实例
    let key = req.query.key;
    let reg = new RegExp(key);
    console.log('reg为', reg);
    // page实例
    let page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })

    Product.queryProductDetail(reg, function (err, data) {
        // if(err) return res.send({"error":403, "message":"数据库异常 !"});
        console.log("后台");
        let result = data;
        page.result = result;

        // 查询房屋总数量方法
        Product.queryProductCountAll(function (result) {
            // if (err) return res.send({"error": 403, "message": "数据库异常！"});
            // 总数 
            page.total = result;
            // 每条
            page.rows = result;
            res.send(page);
        })
    })



})


router.post("/addProducts", function (req, res) {
    // 创建实例 
    console.log(111);
    let pro = new Product({
        proName: req.body.proName || '',
        proDesc: req.body.proDesc || '',
        address: req.body.address || '',
        rentPrice: req.body.rentPrice || ''

    })
    Product.addProduct(pro, function (err, result) {
        if (err) {
            return res.send({ "error": 403, "message": "数据库异常" })
        }
        res.send({ "success": true });
    })
})

router.get("/queryProductById", function (req, res) {
    let id = req.query.id
    console.log("this.id=", id);
    Product.queryProductById(id, function (data) {
        let result = data;
        res.send(result);
    })
})
module.exports = router;
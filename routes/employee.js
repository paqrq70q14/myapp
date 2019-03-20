const express = require('express');
const router = express.Router();
const  crypto = require('crypto');
const  Employee = require('../models/employee.js');

 
    // 检测是否登录接口
    router.get('/checkuserLogin', function(req, res){
      if(!req.session.employee){
        // 没有登录
        return res.send({"error":"400", "message":"未登录"})

      }
      res.send({"success":true});
    })
    
    router.post('/userLogin', function (req, res) {
      console.log("req.password=",req.body.password);
        // var md5 = crypto.createHash('md5');
        console.log("req session=", req.session);
        // var password = md5.update(req.body.password).digest('base64');
      // console.log("md5 password=", password);
        var password = req.body.password;
        // req.body.username = username , function = callback 
        Employee.getUserByName(req.body.username, function(result){
          if(!result) return res.send({error:"300", message:"没有此用户"})
        //  console.log(result.password);
        // 密码验证
          if (result.password != password) return res.send({ "error": 1001, "message": "密码错误！" });
        // 记录session
            req.session.employee = result;

            // console.log(req.session.employee);
            res.send({ "success": true });
        })
    })

    
    // 退出功能： 清空session 
    router.get("/employeeLogout",function(req,res) {
        req.session.employee = null;
        res.send({ "success": true });
    });


    module.exports = router;
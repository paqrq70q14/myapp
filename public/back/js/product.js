// import { template } from "handlebars";


$(function(){
    var currentPage = 1;
    var pageSize = 10;

    // 1 一进入页面渲染
    render();
     function render(){
        
        $.ajax({
            type:"get",
            url:"/queryProducts",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success: function(info){
                console.log( info );
                var htmlStr = template('addTpl', info);
                $('.RS_content tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    // 总共多少页-- 向上取整
                    totalPages:  Math.ceil(info.total/info.size),
                    currentPage: info.page,
                    // 当页码被点击时触发事件
                    // 参数： type: 可以标记按钮的功能类型 page:渲染的页码
                    
                    onPageClicked: function(a,b,c,page){
    
                        // 更新当前页(点击页码时调用--不会出现递归)
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 2 删除功能
      $('.table-tbody').on("click", '#del-btn', function(){
         // 获取id
        let id = $(this).data('id');
        console.log(id);
         // 发送ajax给删除接口
         $.ajax({
             type:'get',
             url:'/delProduct',
             data: {
                 id:id
             },
             success: function(info) {
                 console.log(info);
                 render();
             } 
        })  
      })
    })

    // 5 表单校验
    // $('#form').bootstrapValidator({
    //      // 重置隐藏域,全部校验
    // excluded:[],
    // // 指定校验时的图标显示
    // feedbackIcons: {
    //     // 校验成功的
    //     valid: 'glyphicon glyphicon-ok',
    //     invalid: 'glyphicon glyphicon-remove',
    //     validating: 'glyphicon glyphicon-refresh'
    //   },

    // fields:{

    //     // 隐藏域：brandId
    //     brandId:{
    //         validators:{
    //             notEmpty:{
    //                 message:"请选择二级分类"
    //             }
    //         }
    //     },
    //     //商品名称
    //     proName:{
    //         validators:{
    //             notEmpty:{
    //                 message:"请选择商品名称"
    //             }
    //         }
    //     },
    //     price:{
    //         validators:{
    //             notEmpty:{
    //                 message:"请输入租金"
    //             }
    //         }
    //     }
    //     //图片是否满足三张
    //     // picStatus:{
    //     //     validators:{
    //     //         notEmpty:{
    //     //             message:"请上传三张图片"
    //     //         }
    //     //     }
    //     // }


    // }
    // })

    // 6 注册表单校验成功事件
    // $('#form').on('success.bv.form', function( e ){
        //阻止默认提交
        // e.preventDefault();

        // 字符串拼接
        //  var params  = $('#form').serialize();
        //  params += "&picName1=" + picArr[0].picName + "picAddr1" + picArr[0].picAddr;
        //  params += "&picName2=" + picArr[1].picName + "picAddr2" + picArr[1].picAddr;
        //  params += "&picName3=" + picArr[2].picName + "picAddr3" + picArr[2].picAddr;
        
        // 如果有高亮类，则拼接字符串
        // let children = $('.modal-body span');
        // for(var i=0; i <children.length; i++) {
        //   if($(children[i]).hasClass('active')){
        //       let txt = $(children[i]).data('value');
        //       console.log(txt);
        //       params += "&"+ txt + '=1';
        //   }
          
        // } 
        // 通过ajax提交
    //    console.log(params);
        // $.ajax({
        //     type:'post',
        //     url:"/product/addProducts",
        //     data: params,
        //     success: function(info){
        //         console.log( info );
        //      // 关闭模态框并渲染
        //     //  $('#addModal').modal('hide');
           
        //     }

        // })
        
        
    // })
   



       
    


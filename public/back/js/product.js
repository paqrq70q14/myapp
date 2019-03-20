// import { template } from "handlebars";


$(function(){
    var currentPage = 1;
    var pageSize = 5;

    //声明一个数组 专门用于存储图片对象(图片地址+名称)
    // var picArr = [];
    // 1 一进入页面渲染
    render();
     function render(){
        
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailsList",
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
    
                        //更新当前页(点击页码时调用--不会出现递归)
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 2 添加功能
    $('#addBtn').click(function() {
        console.log(11);
        
         $('#addModal').modal('show');
    // 请求二级分类
        //  $.ajax({
        //     type:"get",
        //     url:'/category/querySecondCategoryPaging',
        //     data:{
        //         page: 1,
        //         pageSize: 100
        //     },
        //     success: function(info){
        //         console.log( info );
        //         var htmlStr = template('ulTpl', info);
        //         $('.dropdown-menu').html(htmlStr);
            
        //     }
        // })
    })


    // 3 添加点击事件委托
    // $('.dropdown-menu').on('click','a', function() {
        // var txt = $(this).text();
        // 赋值
        // $('#dropdownText').text( txt );
        // 赋值id
        // var id = $(this).data('id');
        // console.log(id);
        // $('[name="brandId"]').val(id);

        // 监听二级分类隐藏域(brandId)的校验状态为正确
        // $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    // })
   
    
    // 4 图片上传
    // $('#fileUpload').fileupload({
    //     type:'json',
    //     done: function(e,data){
            // 把图片地址存起来
            // var picUrl = data.result.picAddr;
            // var picObj = data.result;
            //  添加到DIV
            // $('#imgBox').prepend('<img src="'+ picUrl +' "width="100" alt="">');
            // 添加对象到数组
            // picArr.unshift(picObj);
            // if(picArr.length > 3){
            //     picArr.pop();
                //结构也要删除(最后一个 imgBox img:last-of-type )
                //找到最后一个IMG类型的子元素
                // var lastChild = $('#imgBox img:last-of-type').remove();
            // }
            // 更新校验状态
            // if(picArr.length === 3){
            //     $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
            // }
            
        // }
    })

    // 5 表单校验
    $('#form').bootstrapValidator({
         // 重置隐藏域,全部校验
    excluded:[],
    // 指定校验时的图标显示
    feedbackIcons: {
        // 校验成功的
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

    fields:{

        // 隐藏域：brandId
        brandId:{
            validators:{
                notEmpty:{
                    message:"请选择二级分类"
                }
            }
        },
        //商品名称
        proName:{
            validators:{
                notEmpty:{
                    message:"请选择商品名称"
                }
            }
        },
        // proDesc:{
        //     validators:{
        //         notEmpty:{
        //             message:"请选择商品描述"
        //         }
        //     }
        // },
        //库存
        // num:{
        //     validators:{
        //         notEmpty:{
        //             message:"请输入商品库存"
        //         },
        //         // 正则校验
        //     regexp:{
        //         // 必须非零开头的数字 *表示0或多个 +表示1个或多个 ？表示0个或1个 /d表示数字
        //         regexp:/^[1-9]\d*$/, 
        //         message:"库存必须是非零开头的数字"
        //     }
        //     }
        // },
        //尺码校验
        // size:{
        //     validators:{
        //         notEmpty:{
        //             message:"请输入商品尺码"
        //         },
        //         // 必须 两位数字-两位数字  {n}表示出现n次 
        //         regexp:{
        //             regexp:/^\d{2}-\d{2}$/,
        //             message:"必须是两位数字 例如32-40"
        //         }
        //     }
        // },
        // oldPrice:{
        //     validators:{
        //         notEmpty:{
        //             message:"请输入原价"
        //         }
        //     }
        // },
        price:{
            validators:{
                notEmpty:{
                    message:"请输入租金"
                }
            }
        }
        //图片是否满足三张
        // picStatus:{
        //     validators:{
        //         notEmpty:{
        //             message:"请上传三张图片"
        //         }
        //     }
        // }


    }
    })

    // 6 注册表单校验成功事件
    $('#form').on('success.bv.form', function( e ){
        //阻止默认提交
        e.preventDefault();

        // 字符串拼接
         var params  = $('#form').serialize();
        //  params += "&picName1=" + picArr[0].picName + "picAddr1" + picArr[0].picAddr;
        //  params += "&picName2=" + picArr[1].picName + "picAddr2" + picArr[1].picAddr;
        //  params += "&picName3=" + picArr[2].picName + "picAddr3" + picArr[2].picAddr;

        // 通过ajax提交
       console.log(params);
        $.ajax({
            type:'post',
            url:"/product/addProducts",
            data: params,
            success: function(info){
                console.log( info );
                // if(info.success){
                //     //关闭模态框
                //     $('#addModal').modal('hide');
                //     //重置
                //     $('#form').data('bootstrapValidator').resetForm(true);
                //     // 重新渲染
                //     currentPage = 1;
                //     render();
                //     // 手动重置
                //     // $('#dropdownText').text("请选择二级分类");
                //     // 删除所有图片
                //     // $('#imgBox img').remove();
                //     // 清空数组
                //     // var picArr = [];

                // }
            }


        })
        
        
    })
   



       
    


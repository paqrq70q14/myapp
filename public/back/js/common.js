

// nprogress 进度条功能


// 结束
NProgress.done();


// 需求： ajax提交时开始进度条 ajax结束后完成进度条
// ajax 全局函数：
// 1 ajaxComplete 请求完成时调用，不管成功还是失败
// 2 ajaxError失败时调用
// 3 ajaxSend 请求发送时调用
// 4 ajaxStart 停止时调用   (第一个ajax开始调用)
// 5 ajaxSuccess 成功时候调用 

$(document).ajaxStart(function(){
    //开始
  NProgress.start();  
})

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done()
    },500)
})


$(function(){

    // 1 公共的二级菜单切换功能
    $(".category").click(function(){
        //slideDown() 下拉 slideUp 上去 slideToggle()切换       
     $(".nav .child").stop().slideToggle();
    })

    // 2 点击菜单按钮，切换菜单(原理--固定定位left:-180px)
    $(".icon-menu").click(function(){
        $(".RS_aside").toggleClass('hidemenu');
        $(".topbar").toggleClass('hidemenu');
        $(".RS_main").toggleClass('hidemenu');
    })


    // 3 退出模态框功能
    $(".icon-logout").click(function(){
        $('#myModal').modal('show')
          
    })


    // 4 点击模态框退出按钮，实现退出
    $("#logout").click(function(){
        // 调用接口清除后台session，销毁登录状态
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success: function(info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })

    })

    // 5 ajax判断登录状态 -- 调用接口询问是否登录
    // if(location.href.indexOf('login.html') === -1){
    //     $.ajax({
    //         type:"get",
    //         url:"/employee/checkuserLogin",
    //         dataType:"json",
    //         success: function(info){
    //             console.log( info );
    //             if(info.error == 400){
    //                 location.href = "login.html";
    //             }
    //         }
    //     })
    // }

    
})
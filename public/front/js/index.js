


$(function(){


    // 渲染
    render();    


    // 渲染方法(按区域)
    function render() {
      // 解析地址栏
      let key = location.search;
      key = decodeURI(key);
      key = key.split('=')[1];
      console.log(key);
  
          $.ajax({
          tpye:"get",
          url:"/product/queryAllProducts",
          data:{
            key: key || ''
          },
          success: function( info ){
              console.log(info);
              let htmlStr = template('ulTpl', info);
            $('.mui-table-view').html(htmlStr);
            $('#location').text(key);
          }
      })
      
    }
   
    // 模态框弹出
    $('#showArea').click(function(){
       $('.hiddenArea').toggle();
    })                         

    // 绑定点击事件
    $('.wrap-content span').on('click', function(){
       
      $(this).toggleClass('button-active');

    })
    // 筛选确认 发送ajax
    $('.enter_btn').click(function(){
       // 遍历spans 判断是否有高亮
       let spans = $('.wrap-content span');
       let params = '';
       for(let i =0; i<spans.length; i++){
          if( $(spans[i]).hasClass('button-active') ) {
            let val = $(spans[i]).data('value');
            params += val +'=1' +'&';
          }
       }
       console.log(params);
      $.ajax({
        type:'get',
        url: '/product/housedetail', //筛选接口
        data: params,
        success: function( info ){
           console.log( info );
           // 渲染
           let htmlStr = template('ulTpl', info)
           $('.mui-table-view').html(htmlStr);
           // 切换类隐藏
           $('.hiddenArea').toggle();
        }
      })
    })

    // 清除按钮
    $('.clear_btn').click(function(){
      $('.hiddenArea span').removeClass('button-active');
    })

})
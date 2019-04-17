


$(function(){
    // 1.获取id
    let key = location.search;
    key = decodeURI(key);
    key = key.split('=')[1];
    console.log('key=',key);

    // 设置一个对象
    let obj = {};
    if(key){
      obj.key = key;
    }
    console.log(obj);

    // 渲染
    render();    


    // 渲染方法(按区域)
    function render() {  
      if(key){
        let key = obj.key;
        $.ajax({
          type:'get',
          url:'/queryByLocation',
          data: {
            key: key
          },
          success: function(info){
            console.log(info);
            let htmlStr = template('ulTpl', info);
            $('.mui-table-view').html(htmlStr);
            $('#location').text(key);
          }
        })
      }else{
        $.ajax({
          type:"get",
          url:"/queryProducts",
          data:{},
          success: function( info ){
              console.log(info);
              let htmlStr = template('ulTpl', info);
            $('.mui-table-view').html(htmlStr);

          }
    }) 
      }

      
    }
   
    //计数器：统计被选中的条件个数
    let count = -1;
  

    // 区域筛选 
    $('#location').on('click', function(){
      console.log(11);
    })

    // 户型筛选 - 隐藏内容弹出
    $('#showArea1').on('click', function(){
      $('.hiddenAreaa').toggle();
      $('.hiddenArea').hide();
    })

    // 户型筛选 - 绑定点击事件
   $('.hiddenAreaa span').on('click', function(){
     
     let val = $(this).data('value');
     let name = $(this).data('name');
     let txtName = $(this).text();
     obj[name] = val;
     console.log(obj);
    // 发送ajax
     $.ajax({
       type:'get',
       url:'/queryRoomType',
       data: obj,
       success: function(info){
         console.log(info);
         $('.hiddenAreaa').hide();
         $('#showArea1').text(txtName);
       }
     })
   })




    // 条件筛选 - 隐藏内容弹出
    $('#showArea').on('click', function(){
      $('.hiddenArea').toggle();
      $('.hiddenAreaa').hide();
    })

    // 条件筛选 - 绑定点击事件
    $('.wrap-content span').on('click', function(){
       
      $(this).toggleClass('button-active');

    })

    $('.wrap-content .sex span').on('click', function(){
      // 单选 添加高亮类
      $(this).addClass('button-active').siblings().removeClass('button-active');
    })

    

    // 筛选确认 发送ajax
    $('.enter_btn').click(function(){
       // 遍历spans 判断是否有高亮
       let spans = $('.wrap-content span');
       // 记录有多少条被选中(性别自动被选中)
      
       for(let i =0; i< spans.length; i++){
        // <span data-name="sex" data-value="1">允许女性</span>
          if($(spans[i]).hasClass('button-active') ) {
            count ++;
            let name = $(spans[i]).data('name');
            let val = $(spans[i]).data('value');
            obj[name] = val;
            // params += name + ':' + val +'&';
          }
       }
       console.log('obj = ',obj);
      //  console.log(params);
       
      $.ajax({
        type:'get',
        url: '/queryByOptions', //筛选接口
        data: obj,
        success: function( info ){
           console.log( info );
           // 渲染
           let htmlStr = template('ulTpl', info)
           $('.mui-table-view').html(htmlStr);
           // 切换类隐藏
           $('.hiddenArea').toggle();
           // 改变筛选按钮的内容
           console.log(count);
      
           if(count === 0) {
              let txt = "筛选"
              $('#showArea span').text(txt);
           }else{
              let txt = count + '项条件'
              $('#showArea span').text(txt);
           }
           // 渲染数据
           render();
        }
      })
    })

    // 清除按钮
    $('.clear_btn').click(function(){
      $('.hiddenArea span').removeClass('button-active');
       count = 0;
    })

})
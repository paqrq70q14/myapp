


$(function () {
    
   let id = getId();
    renderById();
   
    // 渲染方法
    function renderById(){  
        
        $.ajax({
            type:'get',
            url:'/product/queryProductById',
            data: {
                id: id
            },
            success: function( info ){
                console.log(info);
                console.log( typeof(info) );
                let htmlStr = template('tpl', info);
                $('.content').html(htmlStr);
            }
        })
    }
    // 获取id
    function getId() {
        let url = location.search;
        url = url.split('?')[1];
        let id = url.split('=')[1];
        return id; 
    }


})
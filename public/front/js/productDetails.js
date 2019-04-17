


$(function () {
    
   let id = getId();
    renderById();
   
    // 渲染方法
    function renderById(){  
        
        $.ajax({
            type:'get',
            url:'/queryProductById',
            data: {
                id: id
            },
            success: function( info ){
                console.log(info);
                let htmlStr = template('tpl', info[0]);
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
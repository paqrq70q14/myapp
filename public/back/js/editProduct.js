


$(function(){
  // 获取id，并渲染
  let id = getId()
  $.ajax({
    type:'get',
    url:'/queryProductById',
    data: {
        id: id
    },
    success: function( info ){
        console.log(info);
        let htmlStr = template('editTpl', info[0]);
        $('.panel-body').html(htmlStr);
    }
  })
  // 点击修改图片
  $('#fileupload').change(function(e){
    $('#fileImg').attr('src',URL.createObjectURL($(this)[0].files[0]))
    // $('#fileImg1').attr('src',URL.createObjectURL($(this)[0].files[1]))
})



    // 获取id
    function getId() {
      let url = location.search;
      url = url.split('?')[1];
      let id = url.split('=')[1];
      return id; 
  }

})
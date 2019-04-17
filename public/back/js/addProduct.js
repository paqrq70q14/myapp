


$(function(){
    let picArr = [];

    //获取上传图片地址预览
    $('#fileupload').change(function(e){
        $('#fileImg').attr('src',URL.createObjectURL($(this)[0].files[0]))
        // $('#fileImg1').attr('src',URL.createObjectURL($(this)[0].files[1]))
    })
    // 表单数据提交
    // 获取val值
    $('.dropdown-bedroom').on("click", "li", function() {
        // 获取文本, 设置文本
        console.log(111)
        var txt = $(this).text();
        $('#dropdown-bedroom').val( txt );
      });
      
    $('.dropdown-livingRoom').on("click", "li", function() {
    // 获取文本, 设置文本
    console.log(111)
    var txt = $(this).text();
    $('#dropdown-livingRoom').val( txt );
    });
    $('.dropdown-bathroom').on("click", "li", function() {
        // 获取文本, 设置文本
        console.log(111)
        var txt = $(this).text();
        $('#dropdown-bathroom').val( txt );
        });
    

})
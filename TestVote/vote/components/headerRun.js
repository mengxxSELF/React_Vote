import $ from 'jquery'

export default ()=>{
    /* 点击登录 */
    $('.sign_in').click(()=>{
        $('.mask').show();
    })
    /* 搜索*/
    $('.search span').click(()=>{
        let keyword = $('.search input').val();
        let url = `http://localhost:3000/vote/index/search?content=${keyword}`;
        if(keyword&&keyword.length>0){
            //$.ajax({
            //    type:'GET',
            //    url: url,
            //    dataType: "jsonp",
            //    success: function (data) {
            //        console.log(data)
            //    }
            //});

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.status==200&&xhr.readyState==4){
                    var userInfo = xhr.responseText;
                    console.log(userInfo)
                }
            }
            xhr.open('GET',url,true);
            xhr.send()


        }else{
            window.alert('请输入搜索内容')
        }

    })

    $('.header span').eq(1).click(function () {
        localStorage.clear() ;
        window.location.href = '/';
    })

}
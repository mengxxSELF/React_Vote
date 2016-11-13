import $ from 'jquery'

export default ()=>{
    /*登录*/
    $('.subbtn').click(()=>{
        var userN =$('.usernum').val();
        var userP = $('.user_password').val();
        var url='http://localhost:3000/vote/index/info';
        let userData = {
            password:userP,
            id: userN
        }
        if(userN.length>0&&userP.length>0){
            $.ajax({
                url:url,
                method:'POST',
                data:userData,
                dataType:'json',
                context:this, // 成功或者失败的回调中的this
                success: function (result) {
                    console.log(result)
                    if(result.errno==0){
                        localStorage.setItem('user',result.id);
                        alert(result.id+'登录成功')
                        window.location.href = '/'
                    }else{
                        alert(result.msg)
                    }
                }
            })
        }else{
            window.alert('请输入有效信息')
        }

    })
}
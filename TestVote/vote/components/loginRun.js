import $ from 'jquery'


export default ()=> {
    let url = "http://localhost:3000/vote/register/data" ;
    $('.submit').click(()=>{
        let registerData = {
            username: $('input[name=username]').val(),
            mobile:  $('input[name=mobile]').val(),
            description: $('input[name=description]').val(),
            gender:  $('input[name=gender]').val(),
            password: $('input[name=password]').val()
        };
        $.ajax({
            url:url,
            method:'POST',
            data:registerData, // 新的留言传入后台
            dataType:'json',
            context:this, // 成功或者失败的回调中的this
            success: function (result) {
                if(result.errno==0){
                    localStorage.setItem('user',result.id);
                    alert(result.id+'welcome enter the page')
                    window.location.href = '/'
                }
            }
        })
    })
}
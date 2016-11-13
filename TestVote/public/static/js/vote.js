$(document).ready(function () {
    var PageHref = window.location.href;

    /* 首页 */
    if(PageHref.indexOf('/vote/index')>-1) {

        var dataFlag = true;
        function newUser (num){
            if(dataFlag){
                $.get('/vote/index/data?limit=10&offset='+num, function (result) {
                    var result = JSON.parse(result);
                    var total = result.data.total;
                    //console.log(total,num,'see the page')
                    if(total<num){
                        /* 当数据全部加载完毕*/
                        $('.loading').text('all data loaded');
                        dataFlag = false;
                    }else{
                        $('.loading').text('loading')
                        if(result.errno==0){
                            var objects = result.data.objects;
                            addLi(objects); /* 用户列表循环*/
                        }
                    }
                    $('.coming li:first-child').hide();
                })
            }
        }
        newUser (0);

        /* 登录*/
        $('.sign_in').click(function(){
            $('.mask').show();
        })
        /* 点击提交登录信息*/
        $('.submit_info .subbtn').click(function(){
            $.post('/vote/index/info',{password: $('.no_signed input[name=password]').val() ,id:$('.no_signed input[name=id]').val() },function(result){
                console.log(JSON.parse(result))
                var result = JSON.parse(result);
                if(result.errno==0){
                    localStorage.setItem('user',$('.no_signed input[name=id]').val()) ;/* 存在本地*/
                    $('.sign_in').hide();
                    $('.sign_out').show();
                    window.location.href = '/vote/index';
                }else{
                    alert('the message is wrong')
                }
            })
        })

        /* 页面滑动数据刷新*/
        var _start = 0,
            _end =0,
            _content = document.getElementById('page'); /* 滑动部分*/
        _content.addEventListener("touchstart",touchStart,false);
        _content.addEventListener("touchmove",touchMove,false);

        function touchStart (event) {
            var touch = event.targetTouches[0];
            _start = touch.pageY; /* 触摸开始 */
        }

        var num = 10; /* 偏移量*/
        function touchMove(event ,callback){
            /*var touch = event.targetTouches[0];
            var _scrollTop =  document.body.scrollTop; /!* 滚动高度*!/

            _end = (_start - touch.pageY); /!* 触摸结束*!/
            //下滑才执行操作
            if(_end > 0){
                //console.log('upupup' ,_scrollTop)
            }*/
            var realHeight = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);
            var winHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);
            if (realHeight >= winHeight) {
                console.log('will update will update',num)
                /*setTimeout(function () {
                    newUser (num);
                    num += 10;
                },1000)*/
                newUser (num);
                num += 60;
            }
        }
        /* 进行搜索*/
        $('.search span').click(function () {
            var url = '/vote/index/search?content='+ $('input[name=search]').val();
            $.get(url, function (result) {
                if(result){
                    window.location.href = '/vote/search?content='+ $('input[name=search]').val();
                }
            })
        })



        /* 判断页面是否有user */
        if(localStorage.getItem('user')){
            console.log(localStorage.getItem('user'))
            /* 登录变成退出登录*/
            $('.sign_in').hide();
            $('.sign_out').show();
            $('.register a').attr('href','/vote/detail/id='+localStorage.getItem('user'))
            $('.register a').text('user page');
        }

        /* 点击进入用户主页或者注册*/
        $('.register a').click(function () {
            var url = $(this).attr('href');
            $.get(url, function (result) {
                //console.log(result)
                if(result){
                    window.location.href = url;
                }
            })
        })

        /* 点击退出登录*/
        $('.sign_out').click(function () {
            localStorage.clear() ;/* 清除本地*/
            //console.log(localStorage.getItem('user'))
           /* 退出登录变成登录*/
            $('.sign_in').show();
            $('.sign_out').hide();
            window.location.href = '/vote/index';
        })



    }

    /* 搜索*/
    if(PageHref.indexOf('/vote/search')>-1){
        var url = '/vote/index/search?content=' + window.location.href.split('=')[1];
        $.get(url, function (result) {
            var result = JSON.parse(result)
            //console.log(result)
            if(result.data.length>0){
                addLi(result.data);/* 用户列表循环*/
                $('.coming li:first-child').hide()
            }else{
                $('.coming li:first-child').html('the search is end')
            }
        })
    }

    /*  注册页面*/
    if(PageHref.indexOf('/vote/register')>-1){
        /* 重复密码*/
        $('input[name=repassword]').blur(function () {
            if($(this).val()!= $('input[name=password]').val()){
                alertInfo('the repassword is wrong ');
            }
        })

        /* 表单提交检测*/
        function validateForm(){
            var status = true;
            if(!$('input[name=username]').val()||$('input[name=username]').val().length==0) {
                alertInfo('please enter username');
                status =false;
            }
            if(!$('input[name=password]').val()||$('input[name=password]').val().length==0) {
                alertInfo('please enter password');
                status =false;
            }
            if(!$('input[name=repassword]').val()||$('input[name=repassword]').val().length==0) {
                alertInfo('please enter  repassword');
                status =false;
            }
            if(!$('input[name=mobile]').val()||$('input[name=mobile]').val().length==0) {
                alertInfo('please enter mobile');
                status =false;
            }
            return status;
        }

        var submitFlag =true;
        if(submitFlag){
            $('a.submit').click(function(){
                submitFlag = false;
                if(validateForm()){
                    registerData = {
                        username: $('input[name=username]').val(),
                        mobile:  $('input[name=mobile]').val(),
                        description: $('input[name=description]').val(),
                        gender:  $('input[name=gender]').val(),
                        password: $('input[name=password]').val()
                    };
                    $.post('/vote/register/data',registerData,function(result){
                        var result = JSON.parse(result);
                        if(result.errno==0){
                            localStorage.setItem('user',result.id) ;/* 存在本地*/
                            alert(result.id+'welcome enter the page')
                            window.location.href = '/vote/index'
                        }
                        submitFlag =true;
                    })
                }

            })
        }

    }

    /* 用户详情*/
    if(PageHref.indexOf('/vote/detail/id')>-1){
        //console.log(window.location.pathname);
        var id = window.location.pathname.split('=')[1];
        var url = '/vote/all/detail/data?id='+id;
        $.get(url, function (result) {
            if(result){
                var result = JSON.parse(result);
                var data = result.data;
                //console.log(data)
                //console.log(data.vfriend)

                $('.id').text(id);
                $('.rank').text(data.rank);
                $('.vote').text(data.vote);
                $('.head img').attr('src',data.head_icon);
                $('.username').text(data.username);
                $('.description').text(data.description);

                /* 投票的人*/
                data.vfriend.forEach(function (object,index) {
                    var user = $('.vflist li:first-child').clone('true');
                    user.find('.h3').text(object.username); /* 用户名*/
                    user.find('b').text(object.id);
                    user.find('.btn').attr('data-id',object.id);
                    user.find('img').attr('src',object.head_icon); /* 头锟斤拷*/
                    user.css('display','block').appendTo('.vflist');
                })
                $('.vflist li:first-child').hide();
            }
        })
    }

    /* common*/
    /* 点击投票*/
    $('.coming').on('click','li .btn', function () {
        var voteBox = $(this).parents('.up').find('b');

        /* 判断页面是否有user */
        if(localStorage.getItem('user')){
            //console.log('当前页面用户id为',localStorage.getItem('user'))
            var getVote =$(this).attr('data-id') ;
            var voterId = localStorage.getItem('user');
            var url= '/vote/index/poll?id='+getVote+'&voterId='+voterId;

            /* 判断当前用户投票次数*/
            var voteFlag = false;
            $.get('/vote/all/detail/data?id='+voterId, function (result) {
                var voteTimes = JSON.parse(result).data.vote_times;
                if(voteTimes<5){
                    /* 判断id  不可以给自己投票*/
                    if(getVote==voterId){
                        alert('you can`t vote to yourself')
                    }else{
                        $.get(url, function (result) {
                            var result = JSON.parse(result);
                            if(result.errno==0){
                                voteBox.text(parseInt(voteBox.text())+1)
                            }else{
                                alert('you had singed for the people')
                            }
                        })
                    }
                }else{
                    alert('you had voted 5 times,you can`t vote again')
                }
            })

        }else{
            alert('please sign in first')
        }


    })
    /* 错误信息提示*/
    function alertInfo(text){
        $('.mask span').text(text);
        $('.mask').show();
        setTimeout(function () {
            $('.mask').hide();
            $('.mask span').text('');
        },2000)
    }

    /* 用户列表循环*/
    function addLi(objects){
        objects.forEach(function (object,index) {
            var user = $('.coming li:first-child').clone('true');
            user.find('.vote b').text(object.vote); /* 投票数*/
            user.find('.username').text(object.username); /* 用户名*/
            user.find('.userId').text(object.id);
            user.find('.head a').attr('href','/vote/detail/id='+object.id);
            user.find('.descr a').attr('href','/vote/detail/id='+object.id);
            user.find('.btn').attr('data-id',object.id);
            user.find('.description').text(object.description); /* 描述*/
            user.find('img').attr('src',object.head_icon); /* 头像*/
            user.css('display','block').appendTo('.coming');
        })
    }
})
$(document).ready(function () {
    var PageHref = window.location.href;

    /* ��ҳ */
    if(PageHref.indexOf('/vote/index')>-1) {

        var dataFlag = true;
        function newUser (num){
            if(dataFlag){
                $.get('/vote/index/data?limit=10&offset='+num, function (result) {
                    var result = JSON.parse(result);
                    var total = result.data.total;
                    //console.log(total,num,'see the page')
                    if(total<num){
                        /* ������ȫ���������*/
                        $('.loading').text('all data loaded');
                        dataFlag = false;
                    }else{
                        $('.loading').text('loading')
                        if(result.errno==0){
                            var objects = result.data.objects;
                            addLi(objects); /* �û��б�ѭ��*/
                        }
                    }
                    $('.coming li:first-child').hide();
                })
            }
        }
        newUser (0);

        /* ��¼*/
        $('.sign_in').click(function(){
            $('.mask').show();
        })
        /* ����ύ��¼��Ϣ*/
        $('.submit_info .subbtn').click(function(){
            $.post('/vote/index/info',{password: $('.no_signed input[name=password]').val() ,id:$('.no_signed input[name=id]').val() },function(result){
                console.log(JSON.parse(result))
                var result = JSON.parse(result);
                if(result.errno==0){
                    localStorage.setItem('user',$('.no_signed input[name=id]').val()) ;/* ���ڱ���*/
                    $('.sign_in').hide();
                    $('.sign_out').show();
                    window.location.href = '/vote/index';
                }else{
                    alert('the message is wrong')
                }
            })
        })

        /* ҳ�滬������ˢ��*/
        var _start = 0,
            _end =0,
            _content = document.getElementById('page'); /* ��������*/
        _content.addEventListener("touchstart",touchStart,false);
        _content.addEventListener("touchmove",touchMove,false);

        function touchStart (event) {
            var touch = event.targetTouches[0];
            _start = touch.pageY; /* ������ʼ */
        }

        var num = 10; /* ƫ����*/
        function touchMove(event ,callback){
            /*var touch = event.targetTouches[0];
             var _scrollTop =  document.body.scrollTop; /!* �����߶�*!/

             _end = (_start - touch.pageY); /!* ��������*!/
             //�»���ִ�в���
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
        /* ��������*/
        $('.search span').click(function () {
            var url = '/vote/index/search?content='+ $('input[name=search]').val();
            $.get(url, function (result) {
                if(result){
                    window.location.href = '/vote/search?content='+ $('input[name=search]').val();
                }
            })
        })



        /* �ж�ҳ���Ƿ���user */
        if(localStorage.getItem('user')){
            console.log(localStorage.getItem('user'))
            /* ��¼����˳���¼*/
            $('.sign_in').hide();
            $('.sign_out').show();
            $('.register a').attr('href','/vote/detail/id='+localStorage.getItem('user'))
            $('.register a').text('user page');
        }

        /* ��������û���ҳ����ע��*/
        $('.register a').click(function () {
            var url = $(this).attr('href');
            $.get(url, function (result) {
                //console.log(result)
                if(result){
                    window.location.href = url;
                }
            })
        })

        /* ����˳���¼*/
        $('.sign_out').click(function () {
            localStorage.clear() ;/* �������*/
            //console.log(localStorage.getItem('user'))
            /* �˳���¼��ɵ�¼*/
            $('.sign_in').show();
            $('.sign_out').hide();
            window.location.href = '/vote/index';
        })



    }

    /* ����*/
    if(PageHref.indexOf('/vote/search')>-1){
        var url = '/vote/index/search?content=' + window.location.href.split('=')[1];
        $.get(url, function (result) {
            var result = JSON.parse(result)
            //console.log(result)
            if(result.data.length>0){
                addLi(result.data);/* �û��б�ѭ��*/
                $('.coming li:first-child').hide()
            }else{
                $('.coming li:first-child').html('the search is end')
            }
        })
    }

    /*  ע��ҳ��*/
    if(PageHref.indexOf('/vote/register')>-1){
        /* �ظ�����*/
        $('input[name=repassword]').blur(function () {
            if($(this).val()!= $('input[name=password]').val()){
                alertInfo('the repassword is wrong ');
            }
        })

        /* ���ύ���*/
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
                            localStorage.setItem('user',result.id) ;/* ���ڱ���*/
                            alert(result.id+'welcome enter the page')
                            window.location.href = '/vote/index'
                        }
                        submitFlag =true;
                    })
                }

            })
        }

    }

    /* �û�����*/
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

                /* ͶƱ����*/
                data.vfriend.forEach(function (object,index) {
                    var user = $('.vflist li:first-child').clone('true');
                    user.find('.h3').text(object.username); /* �û���*/
                    user.find('b').text(object.id);
                    user.find('.btn').attr('data-id',object.id);
                    user.find('img').attr('src',object.head_icon); /* ͷ��*/
                    user.css('display','block').appendTo('.vflist');
                })
                $('.vflist li:first-child').hide();
            }
        })
    }

    /* common*/
    /* ���ͶƱ*/
    $('.coming').on('click','li .btn', function () {
        var voteBox = $(this).parents('.up').find('b');

        /* �ж�ҳ���Ƿ���user */
        if(localStorage.getItem('user')){
            //console.log('��ǰҳ���û�idΪ',localStorage.getItem('user'))
            var getVote =$(this).attr('data-id') ;
            var voterId = localStorage.getItem('user');
            var url= '/vote/index/poll?id='+getVote+'&voterId='+voterId;

            /* �жϵ�ǰ�û�ͶƱ����*/
            var voteFlag = false;
            $.get('/vote/all/detail/data?id='+voterId, function (result) {
                var voteTimes = JSON.parse(result).data.vote_times;
                if(voteTimes<5){
                    /* �ж�id  �����Ը��Լ�ͶƱ*/
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
    /* ������Ϣ��ʾ*/
    function alertInfo(text){
        $('.mask span').text(text);
        $('.mask').show();
        setTimeout(function () {
            $('.mask').hide();
            $('.mask span').text('');
        },2000)
    }

    /* �û��б�ѭ��*/
    function addLi(objects){
        objects.forEach(function (object,index) {
            var user = $('.coming li:first-child').clone('true');
            user.find('.vote b').text(object.vote); /* ͶƱ��*/
            user.find('.username').text(object.username); /* �û���*/
            user.find('.userId').text(object.id);
            user.find('.head a').attr('href','/vote/detail/id='+object.id);
            user.find('.descr a').attr('href','/vote/detail/id='+object.id);
            user.find('.btn').attr('data-id',object.id);
            user.find('.description').text(object.description); /* ����*/
            user.find('img').attr('src',object.head_icon); /* ͷ��*/
            user.css('display','block').appendTo('.coming');
        })
    }
})
(function(){

    var _start = 0,
        _end =0,
        _content = document.getElementById('page'), /* ��������*/
        _bodyHeight =  document.body.scrollHeight, /* �ĵ��߶�*/
        _clientHeight =  document.body.clientHeight; /* ���ڸ߶�*/
    _content.addEventListener("touchstart",touchStart,false);
    _content.addEventListener("touchmove",touchMove,false);
    _content.addEventListener("touchend",touchEnd,false);

    function touchStart (event) {
        var touch = event.targetTouches[0];
        _start = touch.pageY; /* ������ʼ */
    }

    function touchMove(event ,callback){
        var touch = event.targetTouches[0];
        var _scrollTop =  document.body.scrollTop; /* �����߶�*/

        _end = (_start - touch.pageY); /* ��������*/
        //�»���ִ�в���
        if(_end > 0){
            console.log('upupup' ,_scrollTop)
        }
        var realHeight = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);
        var winHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);
        if (realHeight >= winHeight) {
            callback()
        }


    }
    function touchEnd(event){
        if(_end >0){
            console.log("upupup  "+_end);
        }
    }

})()

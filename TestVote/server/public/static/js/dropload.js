(function(){

    var _start = 0,
        _end =0,
        _content = document.getElementById('page'), /* 滑动部分*/
        _bodyHeight =  document.body.scrollHeight, /* 文档高度*/
        _clientHeight =  document.body.clientHeight; /* 窗口高度*/
    _content.addEventListener("touchstart",touchStart,false);
    _content.addEventListener("touchmove",touchMove,false);
    _content.addEventListener("touchend",touchEnd,false);

    function touchStart (event) {
        var touch = event.targetTouches[0];
        _start = touch.pageY; /* 触摸开始 */
    }

    function touchMove(event ,callback){
        var touch = event.targetTouches[0];
        var _scrollTop =  document.body.scrollTop; /* 滚动高度*/

        _end = (_start - touch.pageY); /* 触摸结束*/
        //下滑才执行操作
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

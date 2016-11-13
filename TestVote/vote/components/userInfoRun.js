import $ from 'jquery'

export default (obj)=>{
    var voteBox = obj.parents('.up').find('b');
    if(localStorage.getItem('user')){
        var getVote =obj.attr('data-id') ;
        var voterId = localStorage.getItem('user');
        var url= 'http://localhost:3000/vote/index/poll?id='+getVote+'&voterId='+voterId;

        $.ajax({
            url:'http://localhost:3000/vote/all/detail/data?id='+voterId,
            method:'GET',
            dataType:'json',
            context:this, // 成功或者失败的回调中的this
            success: function (result) {
                var voteTimes = result.data.vote_times;
                if(voteTimes<5){
                    if(getVote==voterId){
                        alert('you can`t vote to yourself')
                    }else{
                        $.ajax({
                            url:url,
                            method:'GET',
                            dataType:'json',
                            context:this, // 成功或者失败的回调中的this
                            success: function (result) {
                                if(result.errno==0){
                                    voteBox.text(parseInt(voteBox.text())+1)
                                }else{
                                    alert('you had singed for the people')
                                }
                            }
                        })
                    }
                }else{
                    alert('you had voted 5 times,you can`t vote again')
                }
            }
        })

    }else{
        alert('请先去登录')
    }
}
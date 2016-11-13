export default ()=>{
    var url = 'http://localhost:3000/vote/index/data?limit=10&offset=0';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status==200&&xhr.readyState==4){
            var userInfo = xhr.responseText;
            this.setState({
                users: JSON.parse(userInfo).data.objects
            })
        }
    }
    xhr.open('GET',url,true);
    xhr.send()
}
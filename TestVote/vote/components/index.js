import React from 'react';

import {UserList,Header,Mask} from '../index'

let Style ={disply:'none'}

export default class Index extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
        //  初始化状态对象  以前呢是getInitialState
        this.state ={users:[]}
    }

    componentDidMount(){
        var _this = this;
        var url = 'http://localhost:3000/vote/index/data?limit=10&offset=0';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status==200&&xhr.readyState==4){
                var userInfo = xhr.responseText;
                _this.setState({
                    users: JSON.parse(userInfo).data.objects
                })
            }
        }
        xhr.open('GET',url,true);
        xhr.send()


    }

    render() {
        return(
            <div>
                <Header />
                <UserList Users={this.state.users}  />
                <Mask style={Style} />
            </div>
        )
    }
}
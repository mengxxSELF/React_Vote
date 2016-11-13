import React from 'react';
import {Link  } from 'react-router'
import {HeaderRun} from '../index'

export default class Header extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
        this.state ={users:[],searchEnd:[],loginStatus:false,userId:''}
    }

    searching(e){
        let keyword = event.target.value;
        if(keyword&&keyword.length>0){
            var url = 'http://localhost:3000/vote/index/search?content='+keyword;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.status==200&&xhr.readyState==4){
                    var userInfo = xhr.responseText;
                    this.setState({
                        searchEnd: JSON.parse(userInfo).data
                    })
                }
            }
            xhr.open('GET',url,true);
            xhr.send()
        }

    }
    componentDidMount(){
        /* 判断是否存在user*/
        if(localStorage.getItem('user')) {
            var voterId = localStorage.getItem('user');
            console.log(voterId)
            this.setState({loginStatus:true ,userId:voterId})
        }else{
            this.setState({loginStatus:false})
        }
        HeaderRun()
    }

    render() {
        return(
            <div className="header">
                <div className={ !this.state.loginStatus && 'show sign_in' }>
                    <span>用户登入 </span>
                </div>
                <div  className={ this.state.loginStatus && 'show sign_out' }>
                    <span>退出登录</span>
                </div>
                <div className="rule">
                    <Link to="Rules">
                        <span>活动规则</span>
                    </Link>
                </div>
                <div className="title tada">
                    <img src={require('../../public/static/images/title.png')}/>
                </div>
                <div className="register">
                    <Link to="login" className={ !this.state.loginStatus && 'show' }>
                        我要报名
                    </Link>
                    <Link to={`/userDetail/${this.state.userId}`} className={ this.state.loginStatus && 'show' }>
                        用户主页
                    </Link>
                </div>
                <div className="search">
                    <input ref='search'  onChange={this.searching.bind(this)}  type="text" name="search" placeholder="请输入用户名称" />
                        <span>
                            <Link to="/search" >搜索</Link>
                        </span>
                </div>
            </div>
        )
    }
}
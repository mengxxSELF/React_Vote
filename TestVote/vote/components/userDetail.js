import React from 'react';
import {Link} from 'react-router';

import {UserList} from '../index'
export default class UserDetail extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
        this.state ={user:{},vfriend:[]}
    }

    componentDidMount(){
        let userId = this.props.params.id;
        var _this = this;
        var url = 'http://localhost:3000/vote/all/detail/data?id='+userId;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status==200&&xhr.readyState==4){
                var userInfo = xhr.responseText;
                console.log(JSON.parse(userInfo).data)
                _this.setState({
                    user: JSON.parse(userInfo).data,
                    vfriend: JSON.parse(userInfo).data.vfriend
                })

            }
        }
        xhr.open('GET',url,true);
        xhr.send()

    }
    render() {
        return(
            <div className="content">
                <div className="register_header" >
                    <div className="personal">
                        <div className="pl">
                            <div className="head">
                                {
                                    /*   <img src={require(`../../public/static${this.state.user.head_icon}`)}/>
                                     */
                                }
                                <img src={this.state.user.head_icon} alt="" />
                            </div>
                            <div className="p_descr">
                                <p className="username">{this.state.user.username}</p>
                                <p>编号# <b className="id">{this.state.user.id}</b></p>
                            </div>
                        </div>
                        <div className="pr">
                            <div className="p_descr pr_descr">
                                <p><b className="rank">{this.state.user.rank}</b>名</p>
                                <p><b className="vote">{this.state.user.vote}</b>票</p>
                            </div>
                        </div>
                        <div className="motto description">
                            {this.state.user.description}
                        </div>
                    </div>
                    <div className="home register">
                        <Link to="/">
                            活动首页
                        </Link>
                    </div>
                </div>
                <div className="register_content">
                    <div className="vfriend">
                        <div>
                            <span className="line"></span>
                            <span className="dot"></span>
                        </div>
                        <div>
                            已投票的好友
                        </div>
                        <div>
                            <span className="dot"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                    <UserList Users={this.state.vfriend}  />
                </div>
            </div>
        )
    }
}
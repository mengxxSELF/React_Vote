import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery'

import {UserInfoRun} from '../index'

export default class UserInfo extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
    }
    voting(e){
        UserInfoRun($(e.target))
    }
    render() {
        return(
            <li>
                <div className="head">
                    <a href="">
                        <img src={require(`../../public/static${this.props.icon}`)}/>
                    </a>
                </div>
                <div className="up">
                    <div className="vote">
                        <span><b>{this.props.vote}</b>票</span>
                    </div>
                    <div className="btn" data-id={this.props.id} onClick={this.voting.bind(this)}>
                        投TA一票
                    </div>
                </div>
                <div className="descr">
                    <Link to={`userDetail/${this.props.id}`} >
                        <div>
                            <span className="username">{this.props.username}</span>
                            <span>|</span>
                            <span className="userId">编号# <b>{this.props.id}</b></span>
                        </div>
                        <p className="description">{this.props.children}</p>
                    </Link>
                </div>
            </li>
        )
    }
}
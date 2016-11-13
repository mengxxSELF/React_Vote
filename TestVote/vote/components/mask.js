import React from 'react';
import {Link} from 'react-router';

import {MaskRun} from '../index'
export default class Mask extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
        //  初始化状态对象  以前呢是getInitialState
        this.state ={users:[]}
    }
    componentDidMount(){
        MaskRun()
    }
    render() {
        return(
            <div className="mask">
                <div className="submit_info">
                    <div className="no_signed">
                        <div className="sub_title">
                            <span>请输入用户信息进行验证</span>
                        </div>
                        <div className="reitems">
                            <input type="text" name="id" className="reinput usernum" placeholder="请填写用户编号" />
                        </div>
                        <div className="reitems">
                            <input type="text" name="password" className="reinput user_password" placeholder="请填写用户密码" />
                        </div>
                        <div className="subbtn">
                            提交
                        </div>
                        <div className="no_info">
                            <Link to="/login">
                                <span>没有用户名和编号？</span>
                                <span>请先进行报名</span>
                            </Link>
                        </div>
                    </div>
                    <div className="signed">
                        <p>Welcome!</p>
                        <p className="username"></p>
                        <div className="dropout">
                            退出登入
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
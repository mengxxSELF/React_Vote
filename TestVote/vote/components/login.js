import React from 'react';

import {LoginRun} from '../index'
export default class Login extends React.Component{
    constructor(props){
        super(props);  // 调用 父类的初始化函数
    }

    componentDidMount(){
        LoginRun()
    }

    render() {
        return(
            <form  >
                    <div className="register_header">
                        <div className="title tada">
                            <img src="../../public/static/images/title.png" alt="" />
                        </div>
                    </div>
                    <div className="register_item">
                        <div className="reitems">
                            <p className="refont">姓名:</p>
                            <input type="text" name="username" className="reinput" placeholder="请填写姓名" />
                        </div>
                        <div className="reitems">
                            <p className="refont">密码:</p>
                            <input type="password" name="password" className="reinput password initial_password" placeholder="数字或字母不超过10个长度" maxLength="10"/>
                        </div>
                        <div className="reitems">
                            <p className="refont">确认密码:</p>
                            <input type="password" name="repassword" className="reinput password confirm_password" placeholder="数字或字母不超过10个长度" maxLength="10"/>
                        </div>
                        <div className="reitems">
                            <p className="refont">手机号码:</p>
                            <input type="text" name="mobile" className="reinput" placeholder="请填写正确格式的手机号码"/>
                        </div>
                        <div className="reitems">
                            <p className="refont">自我描述:</p>
                            <input type="text" name="description" className="reinput" placeholder="请填写自我描述（20字以内）" maxLength="20"/>
                        </div>
                        <div className="reitems">
                            <p className="refont">性别:</p>
                            <div className="gender">
                                <div>
                                    <input type="radio" name="gender"  /><span>男</span>
                                </div>
                                <div>
                                    <input type="radio" name="gender" /><span>女</span>
                                </div>
                            </div>
                        </div>
                        <a className="rebtn submit">
                            提交
                        </a>
                    </div>
            </form>
        )
    }
}
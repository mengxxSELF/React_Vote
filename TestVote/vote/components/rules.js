import React from 'react';

export default class Rules extends React.Component{
    render() {
        return(
            <div>
                <div className="vfriend vrule">
                    <div>
                        <span className="line"></span>
                        <span className="dot"></span>
                    </div>
                    <div>
                        活动规则
                    </div>
                    <div>
                        <span className="dot"></span>
                        <span className="line"></span>
                    </div>
                </div>
                <div className="rulec">
                    <div>
                        一个人最多投三票
                    </div>
                    <div>
                        只有注册用户才可以有权限投票
                    </div>
                    <div>
                        一个帐号不能重复投给同一个人
                    </div>
                    <div>
                        用户也可以将票投给自己
                    </div>
                </div>
            </div>
        )
    }
}
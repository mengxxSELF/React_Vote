import React from 'react';
import UserInfo from './userInfo'
export default class UserList extends React.Component{
    render() {
        return(
            <div className="content">
                <div className="lists">
                    <div className="coming-box">
                        <ul className="coming">
                            {
                                this.props.Users.map((item,index)=><UserInfo key={index} icon={item.head_icon} id={item.id} username={item.username} vote={item.vote} >{item.description}</UserInfo>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
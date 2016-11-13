import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route ,IndexRoute , hashHistory} from 'react-router';

require('./public/static/css/style.css')

import { Index,Rules , Login,UserDetail,UserList} from './vote';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Index}></Route>
        <Route path="/Rules" component={Rules}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/userDetail/:id" component={UserDetail}></Route>
        <Route path="/search" component={UserList}></Route>
    </Router>,
    document.querySelector('#myApp')
);
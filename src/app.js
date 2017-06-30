// 兼容
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'babel-polyfill';
// reset
import '@/css/reset.scss';
import '@/css/common.scss';
// css
import '@/css/some-c.scss';
import '@/css/news.scss';
import '@/css/center-new-list.scss';

// fetch
import fetch from 'whatwg-fetch';
// 组件
import React,{Component} from 'react';
import {render} from 'react-dom';
// 加载路由
import ReactRouter,{Router,Route,hashHistory,Redirect,IndexRoute} from 'react-router'
// 加载组件
import NewsIndex from '@/components/news_index.js';
import LeftList from '@/components/left-list.js';
import ShowC from '@/components/show-c.js';

// ajax-demo
// import url from './config.js';
// $.ajax({
//     type:'GET',
//     headers:{
//         "Content-Type": "application/json"
//     },
//     // url:'http://localhost:8080/list/article/column/57e4e49af5a4652492d58f27',
//     url:url+'/list/article/column/57e4e49af5a4652492d58f27',
//     data:{},
//     success(res){
//         console.log(res)
//     }
// })

// 路由嵌套
class Box extends Component{
    render(){
        return(
            <div>
                <LeftList />
                {this.props.children} {/* 这是<News />或其他路由组件*/}
            </div>
        )
    }
}

// 渲染
render(
    <div>
        
        <Router history={hashHistory}>
            {/*路由重定向做索引*/}
            <Redirect from="/" to="/news/home/581990f87c5f6d16d25bdc6c" />
            <Route path="/" component={Box}>
                <Route path="news/:index(/:wzId)(/:searchStr)" component={NewsIndex}></Route>
                {/*<Route path="show/:index" component={ShowC}></Route>*/}
            </Route>
        </Router>

    </div>,
    document.getElementById("app")
)
import React,{Component} from 'react';
import {Link} from 'react-router';
import url from '../config.js';
import commonjs from '../js/common.js';


class SearchList extends Component{
    constructor(props){
    super(props);
        this.state = {newLis:[],
            keywords:''
        };
}
 componentWillMount(){

     $.ajax({
        url:url+"/list/search?q=%20%E8%8B%B1%E5%9B%BD&page=3&pageSize=4",
    //  url:'http://localhost:8080/searchList_data.json',
        type:"get",
        dataType:"json",
        cache:false,
        data:{},
        success:(data)=>{
            this.setState({
                newLis:data.data,
                keywords:data.keywords

            });
            console.log(data);

        },
        error:function(){
            console.log('失败')
        }
    });
 }
    render(){
        console.log(this.props.searchUrl,'用户输入关键字');
        console.log(this.state.keywords,'接口提供关键字');
        console.log(this.state.newLis,'asdsd');
        //var newListData=c;
        let searchLists;

        if(this.state.newLis){
            if($.trim(this.props.searchUrl)==$.trim(this.state.keywords)){
                searchLists = this.state.newLis.map((item,index)=>(
                    <Link to={`/news/detail/${item.id}`}  key={index} >
                        <div className="search-nwe-word">
                            <div className="word-title">{item.title}</div>
                            <div className="word-other"><span>{item.media}</span><b>{commonjs.formatMsgTime(item.publishTime)}</b></div>
                        </div>
                        </Link>
                ));
            }else{
                searchLists =<div>没有相应的内容</div>
            }
        }

        return(
            <div>
                {searchLists}
            </div>

        )
    }
}

export default SearchList;
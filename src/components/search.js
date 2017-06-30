/**
 * Created by fjy_128 on 2017/6/21.
 */
import React,{Component} from 'react';
import SearchJQ from '../lib/swiper/swiper-3.4.2.jquery.min.js';
import {Router, Route, Link, browserHistory} from 'react-router';

class Search extends Component{
    constructor(props){
        super(props);
        this.change=this.change.bind(this);
        this.searchKeyWord =this.searchKeyWord.bind(this);
        this.formatMsgTime=this.formatMsgTime.bind(this);
        this.state ={
            // searchStr:''
        };
        this.searchStr ='';

    }

    change(event){
        var $SlideDown = $('.search-slide-down');
        var InputVal = $('#InputVal').val( );
        if(InputVal){
            $SlideDown.slideDown(300 );
        }else{
            $SlideDown.slideUp(300 )
        } 
        $(document).one("click", function(e){
            $SlideDown.slideUp(300 )
        }); 
        event.stopPropagation();
    }

    searchKeyWord(event){
        var InputVal = $('#InputVal').val( );
        if(InputVal){
            window.location = `#/news/search/s/${InputVal}`;
        }else{
            alert("请输入关键字");
            event.preventDefault()
        }

    }

    formatMsgTime (time) {
    var dateTime = new Date(parseInt(time)), year = dateTime.getFullYear(), month = dateTime.getMonth() + 1;
    var day = dateTime.getDate(), hour = dateTime.getHours(), minute = dateTime.getMinutes();
    var second = dateTime.getSeconds(), now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法
    var milliseconds = 0;
    var timeSpanStr;
    milliseconds = now_new - time;

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }
    else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
       return(timeSpanStr) ;
}


    goBack(){
        window.history.back();
    }
    goForward(){
        window.history.forward();
    }
    render(){
        return (

            <div className="m-search">
                <div className="m-search-left">
                    <div className="left pointer " onClick={this.goBack}></div>
                    <div className="right pointer" onClick={this.goForward}></div>
                </div>
                <div className="m-search-right">


                    <div className="left" classID="searchBtn"  onClick={this.searchKeyWord} ></div>

                    <div className="right">
                       <input id="InputVal" onChange={this.change}  type="text" placeholder="大家都在搜：中国证监会行政处罚决定书"  />
                    </div>
                </div>
                <div className="search-slide-down">
                    <ul>
                        <li className="one"><Link to={`/news/detail`}>重磅数据出炉！3月份CP同比增0.9%</Link></li>
                        <li className="two"><Link to={`/news/detail`}>买保险？这三种保险不要买买保险？这三种保险不要买买保险？这三种保险不要买买保险？这三种保险不要买</Link></li>
                        <li className="three"><Link to={`/news/detail`}>人民币连续贬值，你以为换成美元就够了？</Link></li>
                        <li className="four"><Link to={`/news/detail`}>A股大跌后，你醒悟了吗？</Link></li>
                        <li className="five"><Link to={`/news/detail`}>A股大跌后，你醒悟了吗？</Link></li>
                    </ul>
                </div>
            </div>
       )
    }
    componentDidMount(){   }
}
export default Search;

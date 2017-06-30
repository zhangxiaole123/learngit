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
    searchKeyDown(e){
        var InputVal = $('#InputVal').val( );        
        if(e.keyCode=='13'){
            window.location = `#/news/search/s/${InputVal}`;            
        }
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
                       <input id="InputVal" onChange={this.change} onKeyDown={(e)=>{this.searchKeyDown(e)}}  type="text" placeholder="大家都在搜：中国证监会行政处罚决定书"  />
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

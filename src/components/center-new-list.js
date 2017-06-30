/**
 * Created by fjy_128 on 2017/6/23.
 */
 import {Router, Route, Link, browserHistory} from 'react-router'
import React ,{Component} from 'react';
import url from '../config.js';
class CenterNewList extends Component{
    constructor(){
        super();
        this.state={
            pagenumber:'1',
            imgdata:[],
            episodes:[],
            reviews:[]
        };
        this.formatMsgTime = this.formatMsgTime.bind(this)
    }
    formatMsgTime (timespan) {
        var dateTime = new Date(parseInt(timespan));
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        var now = new Date();
        var now_new = Date.parse(now.toDateString());  //typescript转换写法
        var milliseconds = 0;
        var timeSpanStr;
        milliseconds = now_new - timespan;

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

    /*componentDidMount() {
        var onscroll = this.refs.onscroll;
        onscroll.addEventListener('scroll', this.gundongjiazai.bind(this));
    }
    gundongjiazai(event){
        console.log('gundongjiazai')
        var vid=0;
        var page=1;
        var finished=0;
        var sover=0;
        function loadmore(obj){
            if(finished==0 && sover==0)
            {
                var scrollTop = $(obj).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(obj).height();

                if($(".loadmore").length==0)
                {
                    var txt='<div class="loadmore"><span class="loading"></span>加载中..</div>'
                    onscroll.append(txt);
                }

                if (scrollTop + windowHeight -scrollHeight<=50 ) {
                    finished=1;

                    var result = "";
                    for(var i = 0; i < 6; i++){
                        vid++;
                        result+='<li>'
                                +'<a href="http://www.86y.org/art_detail.aspx?id=744">好经典人生语句，经典得让人心痛！'+parseInt(vid)+'</a>'
                                +'</li>'
                    }
                    setTimeout(function(){
                        //$(".loadmore").remove();
                        $('.prolist').append(result);
                        page+=1;
                        finished=0;
                        //最后一页
                        if(page==10)
                        {
                            sover=1;
                            loadover();
                        }
                    },1000);
                    
                }
            }
        }
        loadmore($(this))
    }*/
    componentWillMount(){
        $.ajax({
            url:url+'/list/article/column/57e4e49af5a4652492d58f27?page='+this.state.pagenumber+'&pageSize=10',
            // url: 'http://10.2.113.114:90/webapi/1.0.0/list/article/column/57e4e49af5a4652492d58f27?page='+this.state.pagenumber+'&pageSize=10',
            type: 'GET',
            dataType: 'JSON',
            data: {},
            success:res=>{
                this.setState({
                    imgdata:res.data,
                    episodes:res.episodes.data,
                    reviews:res.reviews
                })
                
            }
        })
    }
    render(){
        let CenterNewPic;
        let CenterNewVideo;
        let CenterNewWord;
        if(this.state.imgdata){
            //图片新闻            
            CenterNewPic=this.state.imgdata.map((item,index)=>(
                <Link class="center-new-pic clearfix" key={index} to={`/news/detail/${item.id}`}>
                    <div class="left"><img src={item.picUrl}/></div>
                    <div class="right">
                        <div class="pic-title">{item.title}</div>
                        <div class="pic-other"><span>{item.media}</span><b>{this.formatMsgTime(item.publishTime)}</b></div>
                    </div>
                </Link>
            ));
            //有声新闻
            CenterNewVideo =this.state.episodes.map((episodesItem,index)=>(
                <Link class="center-new-voice" key={index} to={`/news/detail/${episodesItem.id}`}>
                    <div class="voice-title">{episodesItem.title}</div>
                    <div class="voice-other">
                        <div class="voice-btn"><span></span><i>07:11</i></div>
                        <span>有声开奖</span>
                        <b>{this.formatMsgTime(episodesItem.publishTime)}</b>
                    </div>
                </Link>
            ));
            //纯文本新闻
            CenterNewWord =this.state.reviews.map((reviewsItem,index)=>(
                <Link class="center-nwe-word" key={index} to={`/news/detail/${reviewsItem.id}`}>
                    <div class="word-title">{reviewsItem.title}</div>
                    <div class="word-other"><span>{reviewsItem.media}</span><b>{this.formatMsgTime(reviewsItem.publishTime)}</b></div>
                </Link >
            ));
        }  
        return (

            <div className="Wrap-MainNew-List" ref="onscroll" >
                <div >
                    {CenterNewPic}
                  
                </div>
                <div >
                  
                    {CenterNewVideo}
                   
                </div>
                <div >
                   
                    {CenterNewWord}
                </div>
                
            </div>
        )
    }
}
export default CenterNewList ;

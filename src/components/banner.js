import React,{Component} from 'react';
import {Link} from 'react-router';

import '../lib/swiper/swiper-3.4.2.min.css';
import Banner from '../lib/swiper/swiper-3.4.2.jquery.min.js';
import url from '../config.js';
class BannerDom extends Component{
    constructor(props){
        super(props);
        this.state = {data:[]};

    }
    componentWillMount(){
        $.ajax({
            type:'GET',
            cache:false,
            dataType:'JSON',
            headers:{
                "Content-Type": "application/json"
            },
            url:url+'/list/article/column/57e4e49af5a4652492d58f27',
            // url:'http://localhost:8080/index-center.json',
            data:{},
            success:res => {
                this.setState({data:res.banners})
                console.log(res)
            }
        });
    }

    render(){
        let banners;
        if(this.state.data){
            banners = this.state.data.map((item,index)=>(
                <div class="swiper-slide" key={index} data-url={item.linkUrl}>
                    <Link to={`/news/detail/${item.articleId}`}>
                        <img style={{width:'100%'}} src={ item.picUrl } />
                        <div className="banner-title">
                        <span>{item.title}</span>
                        </div>
                    </Link>
                </div>
            ));
        }
        return (
            <div class="u-banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {banners}
                    </div>
                    {/*如果需要分页器*/}
                    <div class="swiper-pagination"></div>

                    {/*如果需要导航按钮*/}
                    {/*<div class="swiper-button-prev"></div>
                     <div class="swiper-button-next"></div>*/}

                    {/*如果需要滚动条*/}
                    {/*<div class="swiper-scrollbar"></div>*/}
                </div>
            </div>
        )
    }
    // 装载后
    componentDidMount(){
        window.setTimeout(()=>{//兼容react
            const mySwiper = new Swiper ('.swiper-container', {
                autoplay:5000,
                // direction: 'vertical',
                loop: false,
                // 如果需要分页器
                pagination: '.swiper-pagination',
                // paginationClickable: true,

                // 如果需要前进后退按钮
                // nextButton: '.swiper-button-next',
                // prevButton: '.swiper-button-prev',


                // 如果需要滚动条
                // scrollbar: '.swiper-scrollbar',    
            })
        },1000)
      
    };
}

export default BannerDom;
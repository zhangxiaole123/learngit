import React,{Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import url from '../config.js';
import commonjs from '../js/common.js';
class NewsRightNew extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:[]
			
		};
	}
	componentWillMount(){
		$.ajax({
			url:url+'/list/article/column/57e4e49af5a4652492d58f27?page=2&pageSize=5',
			// url: '/data.json',
			type: 'GET',
			dataType: 'JSON',
			data: {},
			headers:{
				"Content-Type":"application/json"
			},
			success:res=>{
				this.setState({
					data:res.data
					
				})
				
			}
		})
		
	}

	render(){
		const item = this.state.data.map((newsItem, index) => (
			<li className="fn-cb"  key={index}  >
				<i/>
				<div>
					<h4><Link to={`/news/detail/${newsItem.id}`} alt="标题" >{newsItem.title}</Link></h4>
					<span>{newsItem.media}</span>
					<span className="time">{commonjs.formatMsgTime(newsItem.publishTime)}</span>
				</div>
			</li>
		));
		return(
			<div className="news" id="information">
				<h3>最新新闻</h3>
				<ul className="news-list">
					{item}
				</ul>

			</div>
		)
	}
	
}
export default NewsRightNew;
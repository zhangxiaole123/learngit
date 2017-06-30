import React,{Component} from 'react';
import '../lib/jquery.qrcode.min.js';//二维码插件
class NewsDetailAction extends Component{
	constructor(){
		super();
		this.state={
			number:"22",
			backgroundImg:false,
			linkImg:false,
			collectImg:false
		}
	}
	clickCollect(e){
		e.preventDefault();
		//判断是否登录
		var customerId=sessionStorage.customerId;
		if(customerId == undefined){
			alert("请先登录！")
		}else{
			$.ajax({
				url: url+'/action/favorite/article/'+this.props.id,
				type: 'POST',
				dataType: 'JSON',
				data: {},
				success:function(res){
					this.setState({collectImg:!this.state.collectImg});
				}
			})
		}
		
	}
	clickLink(e){
		e.preventDefault();
		//判断是否登录
		var customerId=sessionStorage.customerId;
		if(customerId == undefined){
			alert("请先登录！")
		}else{
			$.ajax({
				url: url+'/action/like/article/'+this.props.id,
				type: 'POST',
				dataType: 'JSON',
				data: {},
				success:function(res){
					this.setState({linkImg:!this.state.linkImg});
				}
			})
		}
		
	}
	MouseOver(){
		this.setState({wechat:true});
	}
	MouseLeave(){
		this.setState({wechat:false});
	}

	render(){
		return(
			<div className="newsdetail-a">
				
				<a href="##" alt="点赞" 
				onClick={this.clickLink.bind(this)}
				className={this.state.linkImg ? "onLinkImg" : "linkImg"}><i></i>
				({this.state.number})</a>


				<a href="##" alt="收藏" 
				onClick={this.clickCollect.bind(this)}
				className={this.state.collectImg ? "collect onCollectImg" : "collect collectImg"}><i></i>
				收藏({this.state.number})</a>

				<a 	
					alt="分享"  
					className={this.state.wechat ? "onWechat" : "wechat"}
					onMouseLeave={this.MouseLeave.bind(this)}
					onMouseOver={this.MouseOver.bind(this)}>
					<i></i>
					分享到微信
					<div className="newsdetail-code">
						<div id="erweima" />
						<p>扫码分享到微信</p>
					</div>
				</a> 
			</div>
		)
	}
	componentDidMount(){
		$("#erweima").qrcode({ 
			render: 'table', // 渲染方式有table方式（IE兼容）和canvas方式
			width: '80', //宽度 
			height:'80', //高度 
			// text: window.location.href, //内容 
			text:window.location.href.match(/https?\:\/\/(\S*)\?/)[1],
			typeNumber:-1,//计算模式
			correctLevel:2,//二维码纠错级别
			background:"#ffffff",//背景颜色
			foreground:"#000000"  //二维码颜色
		})
	
	}
}
export default NewsDetailAction;
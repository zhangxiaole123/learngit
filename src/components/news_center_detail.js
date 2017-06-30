
import React,{Component} from 'react';
import ReportModal from '@/components/reportModal.js';
import url from '../config.js';
import commonjs from '../js/common.js';
import '../lib/jquery.qrcode.min.js';


class NewsDetail extends Component{
	constructor(){
		super();
		this.state={
			data:[],
			authors:[],
			publishTime:'',
			likeCnt:'0',
			lickClick:true,
			id:'',
			favoriteCnt:'0',
			collectImg:false,
			clickCollect:true,
			isCavoriteCnt:false
		}
	}

	componentWillMount(){	
		$.ajax({
			url:url+'/read/article/'+this.props.wzId,
			type: 'GET',
			dataType: 'JSON',
			data: {},
			headers:{
				"Content-Type":"application/json"
			},
			success:res=>{
				this.setState({
					data:res.data,
					authors:res.data.authors,
					publishTime:res.data.publishTime,
					likeCnt:res.data.stats.likeCnt,
					favoriteCnt:res.data.stats.favoriteCnt
				})
			}
		})
	}
	//登录弹窗
	showReportModal(e){
		e.preventDefault();
		$("#maskLayer").show();
		$('.reportModal').show();
	}
	//详情页中间内容
	createMarkup(){
		return {__html: this.state.data.content};
	}
	//收藏
	clickCollect(e){
		e.preventDefault();
		//判断是否登录
		if(window.localStorage){
			let number = window.localStorage.getItem('userName');
			if(this.state.clickCollect==true){
				this.setState({clickCollect:false})
				$.ajax({
					url: url+'/action/favorite/article/',
					type: 'POST',
					dataType: 'JSON',
					data: {
						id: this.props.wzId,
						number:number
					},
					success:res=>{
						console.log('收藏成功')
						console.log(res)
						this.setState({
							collectImg:true,
							favoriteCnt:this.state.favoriteCnt+1,
							isCavoriteCnt:true
						})
					}
				})
			}
		}else{
			alert("请先登录！")
		}
	}
	//点赞
	clickLink(e){
		e.preventDefault();
		if(this.state.lickClick==true){

			this.setState({
				linkImg:!this.state.linkImg,
				likeCnt:this.state.likeCnt + 1,
				click:false
			});
			$.ajax({
				url: url+'action/like/article/',
				type: 'POST',
				dataType: 'JSON',
				data: {
					id:this.state.data.stats.id,
					likeCnt:this.state.likeCnt
				},
				success:function(res){
					console.log('点赞成功!')
				}
			})
		}
		
	}
	render(){

		let item = this.state.data?this.state.data:'';
		let auth;
		if(this.state.authors){
			auth = this.state.authors.map(itmes => (
				<span className="writer">作者 : {itmes.name}</span>
			))
		}
		return(
			<div>
				<div className="news-detail-header">
					<h1>{item.title}</h1>
					<span className="newssource">新闻来源 : {item.media}</span>
					<span className="datasource">数据来源 : {item.sourceName}</span>

					{auth}
					<span>{commonjs.formatMsgTime(item.publishTime)}</span>

				</div>
				<div className="news-detail-body">
					<div className="body-text" dangerouslySetInnerHTML={this.createMarkup()}>
						
					</div>				
					<div className="newsdetail-a">
						
						<a href="##" alt="点赞" 
						onClick={this.clickLink.bind(this)}
						className={this.state.linkImg ? "onLinkImg" : "linkImg"}><i></i>
						({this.state.likeCnt})</a>


						<a href="##" alt="收藏" 
						onClick={this.clickCollect.bind(this)}
						className={this.state.collectImg ? "collect onCollectImg" : "collect collectImg"}><i></i>
						{this.state.isCavoriteCnt?'已收藏':'收藏'}
						({this.state.favoriteCnt})</a>

						<a 	alt="分享"  className="wechat">
							<i></i>
							分享到微信
							<div className="newsdetail-code">
								<div style={{width:'80px',height:'80px'}} id="erweima"></div>
								<p>扫码分享到微信</p>
							</div>
						</a> 
					</div>					
					<div className="report">
						<a className="showreport" href="##" onClick={this.showReportModal.bind(this)}>举报</a>
						<ReportModal  id={this.props.wzId} className="reportModal g-center"/>
					</div>
				</div>
				<div className="news-detail-footer">
					<h4><i></i>免责声明</h4>
					<p>投资有风险，外部资讯仅供参考，不代表广发证券股份有限公司对其内容的认可或推荐，不构成广发证券股份有限公司做出的投资建议或对任何证券投资价值。观点的认可。投资者应当自主进行投资决策，对投资者因依赖上述信息进行投资决策而导致的财产损失，本公司不承担法律责任。</p>
				</div>
			</div>			
		)
	};
	componentDidMount(){
		$("#erweima").qrcode({ 
            render: 'table', // 渲染方式有table方式（IE兼容）和canvas方式
            width: '80', //宽度 
            height:'80', //高度 
            text: window.location.href.match(/https?\:\/\/(\S*)\?/)[1], //内容
        });
	};
	componentWillUpdate(){
		$("#erweima").empty();//清空
		$("#erweima").qrcode({ 
            render: 'table', // 渲染方式有table方式（IE兼容）和canvas方式
            width: '80', //宽度 
            height:'80', //高度 
            text: window.location.href.match(/https?\:\/\/(\S*)\?/)[1], //内容
        });
	}
}
export default NewsDetail;
import React,{Component} from 'react';
import {Link} from 'react-router';
import url from '../config.js';
import commonjs from '../js/common.js'

class InformationDetail extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
	};
	render(){		
		return(
			<div className="detail">
				<Link className="text" to={`/news/detail/${this.props.targetId}`}>{this.props.title}</Link>
				<span className="source">{this.props.media}</span>
				<span className="time">{commonjs.formatMsgTime(this.props.publishTime)}</span>
			</div>
		)
	}
}

class Information extends Component{
	constructor(props){
		super(props);
		this.state = {
			wzId:this.props.wzId,
			correlationData:''
		};
	}
	render(){
		console.log(this.state)
		let showInformationDetail=()=>{
			if(this.state.correlationData){
				let count =3;//显示条数
				let showDom=this.state.correlationData.data.slice(0,count).map((_v,_i)=>(					
					<InformationDetail key={_i} targetId={_v.id} media={_v.media} publishTime={_v.publishTime} title={_v.title} />						
				))
				return showDom;
			}
		}

		return(
			<div className="information">
				<div>
					<h3 className="history title">历史回顾</h3>
					<InformationDetail wzId={this.props.wzId} />
					<InformationDetail wzId={this.props.wzId} />
					<InformationDetail wzId={this.props.wzId} />
				</div>
				<div>
					<h3 className="correlation title">相关资讯</h3>
					{showInformationDetail()}
				</div>
			</div>
		)
	}
	componentWillMount(){
		$.ajax({
			type:'GET',
			url:url+'/list/article/relate/'+this.props.wzId,
			// url:'/corre.json',
			data:{},
			success:(res)=>{
				console.log(res)
				this.setState({
					correlationData:res
				})
			}
		})
	}
}
export default Information;
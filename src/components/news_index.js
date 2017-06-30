
import React,{Component} from 'react';

import Search from '@/components/search.js';
import LeftList from '@/components/left-list.js';
import RightLogin from '@/components/right_login.js';
import RightDownload from '@/components/right_download.js';
import RightNew from '@/components/right_new.js';	
import Banner from "@/components/banner.js";
import CenterNewList from "@/components/center-new-list.js";
import Information from "@/components/right_information.js";
import NewsCenterDetail from "@/components/news_center_detail.js";			
import SearchList from "@/components/search-list.js";
import url from "../config.js";	

    
//资讯首页
class NewsIndex extends Component{
	constructor(props){
		super(props);
		this.state={
			searchData:[]
		}
	}
	componentWillMount(){}
	render(){
		let showlist;
		let right;
		if(this.props.params.index=='detail'){

			showlist = <NewsCenterDetail wzId={this.props.params.wzId} />
			right = <Information wzId={this.props.params.wzId} />
			
		}else if(this.props.params.index=='search'){
			showlist=<SearchList searchUrl={this.props.params.searchStr}/>
		}else{
			showlist = <div><Banner /> <CenterNewList /></div>
			right = <RightNew wzId={this.props.params.wzId}/>
		}
		
		return(			
			<div>
				<div className="righttop">
					<RightLogin />
	                <RightDownload />
	               	{right}
				</div>
				<div  className="news-center">
					<Search />
               		{showlist}
				</div>
				
			</div>
		)
	}
}
export default NewsIndex;
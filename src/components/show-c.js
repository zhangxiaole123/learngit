import React,{Component} from 'react';


import NewsIndex from "@/components/news_index.js";
class Show extends Component{
    render(){
    	console.log(this.props.param)
        return (
        	<div>
        		<NewsIndex />
            </div>
        )
    }
}


export default Show;
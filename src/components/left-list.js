
import React,{Component} from 'react';
import Router,{Link,browserHistory} from 'react-router';
// import SubList from './sub-list.js';
import url from '../config.js';


class SubList extends Component{
    render(){
        let pathname=location.hash.split('?')[0].substr(2).split('/')[0];//news
        let ifAct=()=>{
            if(pathname=='news'){
                return 'u-list-act'
            }
        }
        return (
            <div style={ {position:'relative',display:this.props.ifShow?"block":"none"} } >
                <Link className={"u-list " + ifAct()}  to="/news/home">{this.props.name}</Link>
                <span className={'u-img'+' '+'u-img'+this.props.id}> </span>                
            </div>
       )
    }
}

class LeftList extends Component{
    render(){   
        let dom="";
        if(this.state){
            let data=this.state.data;
            dom=data.map((_v,_i)=>(
                <SubList key={_i} ifShow={_v.fixed} id={_v.id} name={_v.title} />
            ))
        }
        return (
            <div className="m-leftList f-leftList">
                {dom}
                <div style={ {position:'relative'} } >

                    <div className={"u-list "}  to="/news">更多</div>
                    <span className={'u-img'+' '+'u-img'+this.props.id}></span>                

                </div>
            </div>
        )
    };
    componentWillMount(){
        $.ajax({
            type:'GET',
            headers:{"Content-Type":"application/json"},
            url:url+'/list/column',
            // url:'/column.json',
            success:(res)=>{
                this.setState(res)
            }
        })
    }
}

export default LeftList;

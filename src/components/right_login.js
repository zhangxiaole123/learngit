import React,{Component} from 'react';
import url from '../config.js';
class RightLogin extends Component{
	constructor(){
		super();
		this.state = {
			showModule:false,
			hasLogined:false,
			isGet:true,
			userName:''
		};
	}
	//有缓存自动登录
	componentDidMount(){

		if(window.localStorage){
			let userNames = window.localStorage.getItem('userName')
			this.setState({
				userName:userNames,
				hasLogined:true
			})
		}
	}
	//退出登录 清除缓存
	deleteStorage(e){
		e.preventDefault();
		window.localStorage.clear();
		this.setState({hasLogined:false})
	}
	close(e){
        e.preventDefault();
       	this.setState({
			showModule:false
		})
    }
	showModule(e){
		e.preventDefault();
		this.setState({
			showModule:true
		})		
	};
	getPhoneCode(e){
		e.preventDefault();
		var phonenumber = this.refs.phonenumber.value;
		var imgcode = this.refs.imgcode.value;
		if(this.state.isGet==true){
			this.setState({
				isGet:false
			})
			$.ajax({
				url: url + '/ws/pub/token/access_token/mobile/ticket',
				type: 'POST',
				dataType: 'json',
				data: {
					mobile:phonenumber,
					ticket:imgcode
				},
				success:function(res){
					console.log('ok')
				},
				error:function (res) {
					console.log('shibai')
				}
			})
		}
	}
    gftSubmit(e){	
    	e.preventDefault();
    	var phonenumber = this.refs.phonenumber.value;
    	var phonecode = this.refs.phonecode.value;
    	var canshu = 'response_type=token&client_id=wjjx&redirect_uri=/&mobile='+phonenumber+'&ticket='+phonecode;
    	$.ajax({
    		url:url+'/ws/pub/token/access_token/mobile?'+canshu,
    		type: 'POST',
    		dataType:"json",
    		async: false,
    		success:res=>{
    			this.setState({
					showModule:false,
					hasLogined:true,
					userName:res.user_id,
				})
				//localStorage.setItem("userName", res.user_id);
				$.ajax({
					url: 'http://10.2.113.114:90/webapi/1.0.0/session',
					type: 'POST',
					dataType: 'JSON',
					data: {
						'token':'a20e8102-2ebe-41aa-84a2-6cab8dd10e4b'
					},
					success:res=>{
						console.log('OK')
						console.log(res)
					},
					error:res=>{
						console.log('shibai')
					}
				})
    		},	
    		error:function(error){
    			//console.log('error')
    		}
    	})   	
    }	
    jySubmit(e){
    	e.preventDefault();
    	var username = this.refs.username.value;
		var password = this.refs.password.value;
		var ticket = this.refs.ticket.value;
    	$.ajax({
    		url:'',
    		type: 'POST',
    		dataType: 'JSON',
    		data: {
    		},
    		success:function(res){
    			that.setState({
					showModule:false,
					userName:res.client_id,
				})
    		}
    	})
    }
    toGftlogin(e){
    	e.preventDefault();
    	$('#gftlogin').show();
    	$('#jylogin').hide();  	
    	$('.togft').addClass('active').siblings('a').removeClass('active');
    }
    toJylogin(e){
    	e.preventDefault();
    	$('#gftlogin').hide();
    	$('#jylogin').show();
    	$('.tojy').addClass('active').siblings('a').removeClass('active');
    }
	render(){
		let getPhone = this.state.isGet?'发送验证码':'请稍后...';
		let login = this.state.hasLogined
		?
		<div className="islogin"  href="##" alt="登录">
			<i className="userimg"></i>
			{this.state.userName}
			<div className="DropDownBox" classID="DropDownBox">
				<div className="arrowBox"></div>
				<div className="centerBox">
					<a href="##" className="myCollection">我的收藏</a>
					<a href="##" onClick={this.deleteStorage.bind(this)} className="signOut">退出</a>
				</div>
			</div>
		</div>
		:
		<a className="register" href="##" alt="登录" onClick={this.showModule.bind(this)}>登录</a>
		


		return(
			<div className="login">
				{login}
				<a className="open" href="##" alt="开户">开户</a>
				<a className="feedback" href="##" alt="意见反馈">意见反馈</a>
				<div className="loginModal g-center" style={{display:this.state.showModule?"block":"none"}}>
	                <div className="loginHeader">
	                    <a className="loginTitle togft active" onClick={this.toGftlogin.bind(this)} href="##" ><span className="fn-xsj"></span>广发通登录</a>
	                    <a className="loginTitle tojy" onClick={this.toJylogin.bind(this)}  href="##"><span className="fn-xsj"></span>交易登录</a>
	                </div>
	                <div className="loginbody" >
	                    <div id="gftlogin" className="gfLogin" >
		                    <form id="gftLogin">
		                        <div className="phonenumber">
		                            <input id="phonenumber" ref="phonenumber"
		                            type="text" placeholder="手机号" maxLength="11"/>
		                        </div>
		                        <div className="">
		                            <input type="text" id="imgcode " ref="imgcode" maxLength="4" placeholder="输入图形验证码" />

		                            <img className="imgcode"  src="http://localhost:8080/kaptcha.jpg"/>                               
		                        </div>
		                        <div>
		                            <input type="text" ref="phonecode" id="phonecode"  placeholder="手机验证码" />
		                            <a href="##" onClick={this.getPhoneCode.bind(this)} className="gfYzm gfPYzm">{getPhone}</a>                               
		                        </div>
		                        
		                        <button href="##" className="btn-loginModal" onClick={this.gftSubmit.bind(this)}>登录</button>
		                    </form>
	                    </div>
	                    <div id="jylogin" className="gfLogin" style={{display:'none'}}>
		                    <form>
		                        <div className="phonenumber">
		                            <input id="username" ref="username" type="text" placeholder="用户名" />
		                        </div>
		                        <div className="">
		                            <input id="password" type="password" ref="password" placeholder="用户密码" />
		                            <a className="gfYzm color000" href="##">注册开户</a>                                
		                        </div>
		                        <div>
		                            <input id="phonecode_jy" type="text"  ref="ticket" placeholder="手机验证码" />
		                            <a href="##" className="gfYzm color000">发送验证码</a>                               
		                        </div>
		                        <button className="btn-loginModal" onClick={this.jySubmit.bind(this)}>登录</button>
		                    </form>
	                    </div>
	                </div>
	                <a className="close" href="##" onClick={this.close.bind(this)} >+</a>
	            </div>
	            <div id="maskLayer" className="maskLayer" style={{display:this.state.showModule?"block":"none"}}></div>
			</div>
		)
	}
	
}
export default RightLogin;
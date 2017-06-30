
import React,{Component} from 'react';

class ReportModal extends Component{
    constructor(){
        super();
        this.state={
            //checkbox:false
        }
    }
    /*checkBox(){
        this.setState({
            checkbox:!this.state.checkbox
        })
    }*/
    report(){
        console.log('click');
        var checkbox = this.refs.checkbox;
        $('checkbox').toggleClass('.blueCheckbox-act')

    }
    submit(e){
        e.preventDefault();
        $("#maskLayer").hide();
        $('.reportModal').hide();
    }
    render(){
        /*let id  = this.props.id;
        let arr = [
            '捏造事实、传播政治性等造谣',
            '恶意营销',
            '涉及色情等敏感话题',
            '版权类侵权（媒体不当引入、抄袭）',
            '恶意诽谤、贬损他人',
            '其他意见和建议'];
        let li = arr.map((item,index)=>(
                <li className="g-ma" key={index} onClick={this.checkBox.bind(this)}>
                    <label>{item}                              
                        <input type="checkbox" value=''/>
                        <span className={this.state.checkbox?'blueCheckbox blueCheckbox-act':'blueCheckbox'}> </span>
                    </label>
                </li>
            ))*/
        return(
            <div className="reportModal g-center" style={{display:'none'}}>
                <div className="reportTitle">
                    <h4>举报文章问题</h4>
                </div>
                <div>
                    <ul id="report">   
                        <li className="g-ma">
                            <label>捏造事实、传播政治性等造谣                              
                                <input type="checkbox" value=''/>
                                <span  onClick={this.report.bind(this)} ref="checkbox" className="blueCheckbox "> </span>
                            </label>
                        </li>
                        <li className="g-ma">
                            <label>恶意营销
                                <input type="checkbox" />
                                <span  onClick={this.report.bind(this)} ref="checkbox" className="blueCheckbox "> </span>
                                
                            </label>
                        </li>
                        <li className="g-ma">
                            <label>涉及色情等敏感话题
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>
                                
                            </label>                            
                        </li>
                        <li className="g-ma">
                            <label>版权类侵权（媒体不当引入、抄袭）
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>
                                
                            </label>                            
                        </li>
                        <li className="g-ma">
                            <label>恶意诽谤、贬损他人
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>
                                
                            </label>                            
                        </li>
                        <li className="g-ma">
                            <label>其他意见和建议
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>              
                            </label>                            
                        </li>             
                    </ul>
                    <textarea  className="textare-other g-ma"></textarea>
                    <button className="btn-submit g-ma"  onClick={this.submit.bind(this)}>确认</button>
                </div>
            </div>
        )
    }
}
export default ReportModal;
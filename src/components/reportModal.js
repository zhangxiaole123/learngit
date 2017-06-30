
import React,{Component} from 'react';

class ReportModal extends Component{
    submit(e){
        e.preventDefault();
        $("#maskLayer").hide();
        $('.reportModal').hide();
    }
    render(){
        return(
            <div className="reportModal g-center" style={{display:'none'}}>
                <div className="reportTitle">
                    <h4>举报文章问题</h4>
                </div>
                <div>
                    <ul>
                        <li className="g-ma">
                            <label>捏造事实、传播政治性等造谣                              
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>
                            </label>
                        </li>
                        <li className="g-ma">
                            <label>恶意营销
                                <input type="checkbox" />
                                <span className="blueCheckbox blueCheckbox-act"> </span>
                                
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
                        <textarea  className="textare-other g-ma"></textarea>
                        <button className="btn-submit g-ma"  onClick={this.submit.bind(this)}>确认</button>
                    </ul>
                </div>
            </div>
        )
    }
}
export default ReportModal;
import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import * as utils from "../utils"

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            memo_flag: false,
            chime_flag: false
        };
        this.textInput = React.createRef();
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.memo_flag !== prevState.memo_flag && !prevState.memo_flag){
            this.textInput.current.focus();
        }
    }
    render(){
        const correct_count = ticktack.display(this.props.data.count);
        const data = this.props.data;
        return (
            <div className="timer">
                {correct_count}
                <div className="timer__memo">
                    <input 
                        type="text"
                        ref={this.textInput}
                        value={this.props.data.memo}
                        onBlur={this.toggle_state.bind(this)}
                        onChange={(e)=>this.props.update_memo(
                            data.parent_id,
                            data.child_id,
                            e.target.value
                        )}
                    />
                </div>
                <div className="timer__btns">
                    {!this.props.data.type ?
                        <input type="button" value="resume" onClick={this.resume.bind(this)} />:
                        null
                    }
                    {!this.props.data.type?
                        <input type="button" value="stop" onClick={this.stop.bind(this)} />:
                        null
                    }
                    <input type="button" value="delete" onClick={()=>{
                        clearInterval(this.props.data.interval_id)
                        this.props.delete_timer(
                            this.props.data.parent_id, 
                            this.props.data.child_id
                        )
                    }} />
                </div>
            </div>
        )
    }
    toggle_state(){
        this.setState({
            memo_flag: !this.state.memo_flag
        });
    }
    resume(){
        const data = this.props.data;
        if(data.stoped_flag){
            this.props.resume_timer(data.child_id);
        }
        // this.tick();
    }
    stop(){
        const data = this.props.data;
        if(!data.stoped_flag){
            this.props.stop_timer(data.child_id);
            // utils.chime.stop();
        }
    }
}

Timer.propTypes = {
    count: PropTypes.number,
    data: PropTypes.shape({
        parent_id: PropTypes.number,
        child_id: PropTypes.string,
        date: PropTypes.Object,
        stoped_flag: PropTypes.bool,
        type: PropTypes.number,
        interval_id: PropTypes.number
    })
};
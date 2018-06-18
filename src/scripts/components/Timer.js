import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import * as utils from "../utils"

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            memo_flag: false,
            chime_flag: true,
        };
        this.textInput = React.createRef();
    }
    componentDidMount(){
        if(parseInt(this.props.data.count, 10) === 0){
            this.setState({
                chime_flag: false
            })
        };
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.memo_flag !== prevState.memo_flag && !prevState.memo_flag){
            this.textInput.current.focus();
        }
        if(parseInt(this.props.data.count, 10) === 0 && this.state.chime_flag){
            this.setState({
                chime_flag: false,
            });
            utils.chime.play(3);
        }
    }
    render(){
        const correct_count = ticktack.display(this.props.data.count);
        const data = this.props.data;
        return (
            <div className="timer">
                <div className="timer__memo">
                    <input 
                        className="timer__memo__input"
                        type="text"
                        ref={this.textInput}
                        value={this.props.data.memo}
                        placeholder="memo"
                        onBlur={this.toggle_state.bind(this)}
                        onChange={(e)=>this.props.update_memo(
                            data.parent_id,
                            data.child_id,
                            e.target.value
                        )}
                    />
                </div>
                <p className="timer__item">{correct_count}</p>
                {this.props.data.stoped_flag && this.props.data.active?
                    <input type="button" value="resume" className="timer__resume" onClick={this.resume.bind(this)} />:
                    <input type="button" value="stop" className="timer__stop" onClick={this.stop.bind(this)} />
                }
                <div className="timer__delete" value="delete" onClick={()=>{
                    clearInterval(this.props.data.interval_id)
                    this.props.delete_timer(
                        this.props.data.parent_id, 
                        this.props.data.child_id
                    )
                }}>×</div>
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
    }
    stop(){
        const data = this.props.data;
        if(!data.stoped_flag){
            this.props.stop_timer(data.child_id);
            if(utils.chime.audio.state === 2){
                utils.chime.stop();
            }
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
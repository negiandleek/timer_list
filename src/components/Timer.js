import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import is_time from "../modules/lib/isTime";
import * as utils from "../utils"

export default class Timer extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.start();
    }
    render(){
        const correct_count = ticktack.display(this.props.data.count);
        return (
            <div className="timer">
                {correct_count}
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
    tick(){
        const props = this.props.data;
        const date = (props.date instanceof Date)? props.date: new Date(props.date);
        const diff = utils.get_diff_date_and_now(date);
        if(diff > 0){
            let count = utils.get_count(diff, props.type);
            this.props.update_timer(
                props.parent_id,
                props.child_id,
                count,
                date
            );
        }else{
            let props = this.props.data;
            this.props.toggle_timer(props.parent_id, props.child_id);
            this.props.update_timer(
                props.parent_id,
                props.child_id,
                "0".repeat(4 + (props.type * 2)), 
            );
        }
    }
    start(){
        const props = this.props;
        const data = this.props.data;
        if(data.stoped_flag)return;
        if(props.interval)return;
        
        this.tick();
        
        const interval = setInterval(() => this.tick(), 1000);
        props.set_interval(
            data.parent_id,
            data.child_id,
            interval
        );
    }
    resume(){
        const data = this.props.data;
        let date = ticktack.generate_in_date_time(data.count, data.type);
        let diff = utils.get_diff_date_and_now(date);
        let count = utils.get_count(date, data.type);

        const interval = setInterval(() => this.tick(), 1000);
        this.props.update_timer(
            data.parent_id,
            data.child_id,
            count,
            date
        );
        this.props.set_interval(
            data.parent_id,
            data.child_id,
            interval
        );
        this.props.toggle_timer(data.parent_id, data.child_id);
        
        this.tick();
    }
    stop(){
        let data = this.props.data;
        clearInterval(data.interval_id);
        this.props.update_timer(data.parent_id, data.child_id, data.count);
        this.props.toggle_timer(data.parent_id, data.child_id);
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
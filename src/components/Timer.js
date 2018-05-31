import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import is_time from "../modules/lib/isTime";

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
        let date = (props.date instanceof Date)? props.date: new Date(props.date);
        let diff = date.getTime() - new Date().getTime();
        if(diff > 0){
            let time = ticktack.convert_milli_to_time(diff);
            ticktack.pad_zero(time, 2);
            let count = ticktack.concatenate_time_to_str(time);
            count = ticktack.slice_time_of_string(count, 4 + (props.type * 2), props.type);

            this.props.update_timer(
                props.parent_id,
                props.child_id,
                count,
                date
            );
        }else{
            let props = this.props.data;
            let zero = "0".repeat(4 + (props.type * 2));

            this.props.update_timer(props.parent_id, props.child_id, zero, null);

            this.props.stop_timer(props.parent_id, props.child_id);
        }
    }
    start(){
        const props = this.props;
        const data = this.props.data;
        if(data.stoped_flag){
            return;
        }
        if(props.interval)return;
        const interval = setInterval(() => this.tick(), 1000);
        props.set_interval(
            data.parent_id,
            data.child_id,
            interval
        );
    }
    resume(){
        const data = this.props.data;
        const interval = setInterval(() => this.tick(), 1000);
        let date = ticktack.generate_in_date_time(data.count, false);
        let diff = date - new Date().getTime();
        let time = ticktack.convert_milli_to_time(diff);
        ticktack.pad_zero(time, 2);
        time = ticktack.concatenate_time_to_str(time);
        let count = ticktack.slice_time_of_string(time, 4, false);

        this.props.update_timer(data.parent_id, data.child_id, count, date);
        this.props.set_interval(
            data.parent_id,
            data.child_id,
            interval
        );
        this.props.resume_timer(data.parent_id, data.child_id);

    }
    stop(){
        let data = this.props.data;
        clearInterval(data.interval_id);
        this.props.update_timer(data.parent_id, data.child_id, data.count, null);
        this.props.stop_timer(data.parent_id, data.child_id);
    }
}

Timer.propTypes = {
    count: PropTypes.number,
    data: PropTypes.shape({
        parent_id: PropTypes.number,
        child_id: PropTypes.string
    })
};
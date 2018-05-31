import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            is_stopped: false
        }
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
                    <input type="button" value="start" onClick={this.start.bind(this)} />
                    <input type="button" value="stop" onClick={this.stop.bind(this)} />
                    {
                        this.state.is_stopped?
                            <input type="button" value="delete" onClick={()=>{
                                this.props.delete_timer(
                                    this.props.data.parent_id, 
                                    this.props.data.child_id
                                )
                            }} />:
                            null
                    }
                </div>
            </div>
        )
    }
    tick(intervalId){
        const props = this.props.data;
        let diff = props.date.getTime() - new Date().getTime();
        if(diff > 0){
            let time = ticktack.convert_milli_to_time(diff);
            ticktack.pad_zero(time, 2);
            let count = ticktack.concatenate_time_to_str(time);
            count = ticktack.slice_time_of_string(count, 4 + (props.type * 2), props.type);

            this.props.update_timer(
                props.parent_id,
                props.child_id,
                count
            );
        }else{
            let props = this.props.data;
            let zero = "0".repeat(4 + (props.type * 2));

            this.props.update_timer(props.parent_id, props.child_id, zero);

            this.setState({
                is_stopped: !this.state.is_stopped
            })
            clearInterval(props.interval_id);
        }
    }
    start(){
        const props = this.props;
        const data = this.props.data;
        if(props.interval)return;
        const interval = setInterval(() => this.tick(), 1000);
        props.set_interval(
            data.parent_id,
            data.child_id,
            interval    
        );
    }
    stop(){
        clearInterval(this.props.data.interval_id);
    }
}

Timer.propTypes = {
    count: PropTypes.number,
    data: PropTypes.shape({
        parent_id: PropTypes.number,
        child_id: PropTypes.number
    })
};
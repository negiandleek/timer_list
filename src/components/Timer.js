import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

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
                    <input type="button" value="start" onClick={this.start.bind(this)} />
                    <input type="button" value="stop" onClick={this.stop.bind(this)} />
                </div>
            </div>
        )
    }
    tick(intervalId){
        const props = this.props.data;
        let diff = props.date.getTime() - new Date().getTime();
        let time = ticktack.convert_milli_to_time(diff);
        let count = ticktack.concatenate_time_to_str(time);
        // TODO: マイナスは000000で表示。deleteが押されるまでそのまま
        if(Number(count) < 0){
            this.props.delete_timer(
                props.parent_id,
                props.child_id
            );
        }else{
            this.props.update_timer(
                props.parent_id,
                props.child_id,
                count
            );
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
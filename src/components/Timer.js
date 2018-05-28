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
        const forwarded_time = ticktack.forward_time(props.count, props.sign * 100);
        if(Number(forwarded_time) < 0){
            this.props.delete_timer(
                props.parent_id,
                props.child_id
            );
        }else{
            this.props.update_timer(
                props.parent_id,
                props.child_id,
                forwarded_time
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
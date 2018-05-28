import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            interval_id: ""
        };
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
        const interval_id = intervalId? intervalId: this.state.interval_id;
        const forwarded_time = ticktack.forward_time(props.count, props.sign * 100);
        this.props.update_timer(
            props.parent_id,
            props.child_id,
            forwarded_time
        );
    }
    start(){
        if(this.state.interval)return;
        const interval = setInterval(() => this.tick(), 1000);
        this.setState({interval_id: interval})
    }
    stop(){
        clearInterval(this.state.interval_id);
    }
}

// Timer.propTypes = {
//     count: PropTypes.number,
//     data: PropTypes.shape({
//         parent_id: PropTypes.number,
//         child_id: PropTypes.number
//     })
// };
import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";


export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.interval;
    }
    componentDidMount(){
        this.start();
    }
    componentWillUnmount(){
        console.log(this.interval)
        clearInterval(this.interval);
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
    start(){
        if(this.interval)return;
        const props = this.props.data;
        this.interval = setInterval(() => this.props.tick(
            props.parent_id,
            props.sign,
            this.props.index
        ), 1000);
    }
    stop(){
        clearInterval(this.interval);
    }
}

Timer.propTypes = {
    count: PropTypes.number,
    data: PropTypes.shape({
        parent_id: PropTypes.number,
        child_id: PropTypes.number
    })
};
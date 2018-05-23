import React from "react";
import PropTypes from "prop-types";
import My from "../modules/index.js";

let my = new My("four");

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.interval;
    }
    componentDidMount(){
        this.start();
    }
    render(){
        const correct_count = my.display(this.props.data.count);
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
            {
                parent_id: props.parent_id,
                child_id: props.child_id
            }
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
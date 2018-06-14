import React from "react";
import PropTypes from "prop-types";

import Timer from "./Timer";

export default class Timers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            interval: false
        };
    }
    componentDidMount(){
        if(this.props.items.length !== 0){
            this.props.update_timer();
            this.props.set_interval_global();
            this.setState({
                interval: true
            });
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.items.length !== 0 && !this.state.interval){
            this.props.set_interval_global();
            this.setState({
                interval: true
            });
        }
        if(this.props.items.length === 0 && this.state.interval){
            this.setState({
                interval: false
            });
            this.props.clear_interval_global();
        }
    }
    render(){
        let props = this.props;
        return(
            <ul>
                {props.items.map((item, i) => (
                    <li key={"timer-" + props.index + "-" + i}>
                        <Timer
                            data={item}
                            update_timer={props.update_timer}
                            delete_timer={props.delete_timer}
                            set_interval={props.set_interval}
                            stop_timer={props.stop_timer}
                            resume_timer={props.resume_timer}
                            update_memo={props.update_memo}
                            set_itnerval_global={props.set_itnerval_global}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}

Timers.propTypes = {
    item: PropTypes.array
};
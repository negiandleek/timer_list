import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

export default class TimerInput extends React.Component{
    constructor(props){
        super(props);
    }
    // getDerivedStateFromProps(nextProp, prevState){

    // }
    render(){
        const correct_count = ticktack.display(this.props.count);
        return (
            <div className="timer-input">
                <form 
                    className="timer-input__form"
                    action="javascript:void(0)"
                    onSubmit={this.props.handle_submit}
                >
                    <input 
                        type="text"
                        value={correct_count}
                        onChange={this.props.handle_change}
                    />
                    <input 
                        type="submit" 
                        value="add"
                    />
                </form>
            </div>
        )
    }
}

TimerInput.propTypes = {
    count: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
}
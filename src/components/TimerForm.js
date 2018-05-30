import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

const TimerForm = (props) => {
    let for_display = ticktack.display(props.form.count);

    function handle_change(e){
        const undisp = ticktack.undisplay(e.target.value);
        const result = ticktack.shift_time_to_input(props.form.count, undisp);
        return result;
    }

    function handle_click(){
        // TODO: alarm
        
        // props.add_timer({
        //     count: props.form.count,
        //     parent_id: props.form.type,
        //     sign: Number(props.form.count) === 0? 1: -1
        // })
        props.init_input();
    }

    return (
        <div className="timer-input">
            <form 
                className="timer-input__form"
                action="javascript:void(0)"
            >
                <input 
                    type="text"
                    value={for_display}
                    onChange={(e) => {
                        props.change_input(handle_change(e))
                    }}
                />
                <input 
                    type="button" 
                    value="count down"
                    onClick={handle_click.bind(this)}
                />
                <input 
                    type="button"
                    value="alarm"
                    // onClick={handle_click.bind(this)}
                />
            </form>
        </div>
    )
}

TimerForm.propTypes = {
    form: PropTypes.shape({
        count: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired
    })
}

export default TimerForm;

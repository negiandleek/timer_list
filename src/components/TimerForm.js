import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import { isArray } from "util";
const reg = /[0-9]:/g;

const TimerForm = (props) => {
    let for_display = ticktack.display(props.form.count);

    function handle_change(e){
        // TODO:0-9,:
        // if(e.target.value.test(/[0-9]|:/,g)){
            
        // }
        const undisp = ticktack.undisplay(e.target.value);
        const result = ticktack.shift_time_to_input(props.form.count, undisp);
        return result;
    }

    function handle_click(isAlarm){
        if(!Number(props.form.count)){
            return void 0;
        }
        let date = ticktack.generate_in_date_time(props.form.count, isAlarm);
        let diff = date - new Date().getTime();
        let time = ticktack.convert_milli_to_time(diff);
        ticktack.pad_zero(time, 2);
        time = ticktack.concatenate_time_to_str(time);
        let count = ticktack.slice_time_of_string(time, 4 + (isAlarm * 2), props.type);
        props.add_timer({
            count: count,
            date: date,
            parent_id: props.form.type,
            sign: Number(props.form.count) === 0? 1: -1,
            type: isAlarm? 1: 0
        });
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
                    onClick={handle_click.bind(this, false)}
                />
                <input 
                    type="button"
                    value="alarm"
                    onClick={handle_click.bind(this, true)}
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

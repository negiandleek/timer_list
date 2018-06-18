import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";
import * as utils from "../utils";

const TimerForm = (props) => {
    let for_display = ticktack.display(props.form.count);

    function handle_change(e){
        const undisp = ticktack.undisplay(e.target.value);
        let result = ticktack.shift_time_to_input(props.form.count, undisp);
        if(!/^[0-9]+$/g.test(result)){
            result = props.form.count;
        };
        props.change_input(result);
    }

    function handle_click(isAlarm){
        if(!Number(props.form.count)){
            return void 0;
        }
        
        let date = ticktack.generate_in_date_time(props.form.count, isAlarm);
        let diff = utils.get_diff_date_and_now(date)
        let count = utils.get_count(diff, isAlarm)
        
        props.add_timer(
            props.form.type, //parent_type
            count,
            date,
            isAlarm? 1: 0 //alarm_flag
        )
        props.init_input();
    }
    return (
        <div className="timer_input">
            <form 
                className="timer_form"
                action="javascript:void(0)"
            >
                <input 
                    className="timer_form__text"
                    type="text"
                    value={for_display}
                    onChange={(e) => handle_change(e)}
                />
                <div className="form_btns">
                    <input 
                        className="form_btns__btn"
                        type="button" 
                        value="count down"
                        onClick={handle_click.bind(this, false)}
                    />
                    <input 
                        className="form_btns__btn"
                        type="button"
                        value="alarm"
                        onClick={handle_click.bind(this, true)}
                    />
                </div>
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

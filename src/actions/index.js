import {add_timer, delete_timer, update_timer, stop_timer, resume_timer, TimerActions} from "./actionTimer";
import {change_input, init_input, set_interval, FormActions} from "./actionTimerForm";
const actions = {
    add_timer,
    delete_timer,
    update_timer,
    TimerActions,
    change_input,
    init_input,
    set_interval,
    FormActions,
    stop_timer,
    resume_timer
};

export default actions;
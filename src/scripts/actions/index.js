import {add_timer, delete_timer, update_timer, stop_timer, resume_timer, update_memo, set_interval_global, clear_interval_global} from "./actionTimer";
import {change_input, init_input} from "./actionTimerForm";
const actions = {
    add_timer,
    delete_timer,
    update_timer,
    update_memo,
    change_input,
    init_input,
    stop_timer,
    resume_timer,
    set_interval_global,
    clear_interval_global
};

export default actions;
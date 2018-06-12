import {add_timer, delete_timer, update_timer, toggle_timer, update_memo} from "./actionTimer";
import {change_input, init_input, set_interval} from "./actionTimerForm";
const actions = {
    add_timer,
    delete_timer,
    update_timer,
    update_memo,
    change_input,
    init_input,
    set_interval,
    toggle_timer
};

export default actions;
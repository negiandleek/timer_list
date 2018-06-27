import React from "react";
import {connect} from "react-redux";
import Timers from "../components/Timers";
import actions from "../actions";
import whiterabbit from "../modules/";

// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => {
    return{
        timers: state.timers
    }
};
  
const mapDispatchToProps = dispatch => ({
    update_timer: (id, count, date) => dispatch(actions.update_timer(id, count, date)),
    delete_timer: (id, inervalId) => dispatch(actions.delete_timer(id, inervalId)),
    set_interval: (id, intervalId) => dispatch(actions.set_interval(id, intervalId)),
    stop_timer: (id) => dispatch(actions.stop_timer(id)),
    resume_timer: (id) => dispatch(actions.resume_timer(id)),
    update_memo: (id, value) => dispatch(actions.update_memo(id, value)),
    set_interval_global: () => actions.set_interval_global(dispatch),
    clear_interval_global: () => actions.clear_interval_global(dispatch)
});

function get_active_timer(props){
    if(props.timers.length === 0) return "00:00";
    let i = 0;
    for(; i < props.timers.length - 1; i += 1){
        if(parseInt(props.timers[i].count) !== 0){
            break;
        }
    }
    let mark = i? "● ": "";
    return mark + whiterabbit.display(props.timers[i].count);
}

const TimerList = (props) => {
    document.title = get_active_timer(props);
    return (
        <div className="timer_list">
            <Timers
                update_timer={props.update_timer}
                delete_timer={props.delete_timer}
                set_interval={props.set_interval}
                stop_timer={props.stop_timer}
                resume_timer={props.resume_timer}
                update_memo={props.update_memo}
                set_interval_global={props.set_interval_global}
                clear_interval_global={props.clear_interval_global}
                items={props.timers}
            />
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);
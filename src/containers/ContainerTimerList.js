import React from "react";
import {connect} from "react-redux";
import Timers from "../components/Timers";
import actions from "../actions";
import { set_interval_global } from "../actions/actionTimer";
import ticktack from "../modules/";

// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => {
    return{
        timers: state.timers
    }
};
  
const mapDispatchToProps = dispatch => ({
    update_timer: (parentId, childId, count, date) => dispatch(actions.update_timer(parentId, childId, count, date)),
    delete_timer: (parentId, childId, inervalId) => dispatch(actions.delete_timer(parentId, childId, inervalId)),
    set_interval: (parentId, childId, intervalId) => dispatch(actions.set_interval(parentId, childId, intervalId)),
    stop_timer: (childId) => dispatch(actions.stop_timer(childId)),
    resume_timer: (childId) => dispatch(actions.resume_timer(childId)),
    update_memo: (parentId, childId, value) => dispatch(actions.update_memo(parentId, childId, value)),
    set_interval_global: () => actions.set_interval_global(dispatch),
    clear_interval_global: () => actions.clear_interval_global(dispatch)
});

const TimerList = (props) => {
    let count = props.timers[0][0].count || "0000";
    let for_display = ticktack.display(count);
    document.title = for_display;
    return (
        <div className="timer_list">
            {props.timers.map((items,i)=>(
                <Timers
                    update_timer={props.update_timer}
                    delete_timer={props.delete_timer}
                    set_interval={props.set_interval}
                    stop_timer={props.stop_timer}
                    resume_timer={props.resume_timer}
                    update_memo={props.update_memo}
                    set_interval_global={props.set_interval_global}
                    clear_interval_global={props.clear_interval_global}
                    items={items}
                    key={"timers-" + i}
                />
            ))}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);
import React from "react";
import {connect} from "react-redux";
import Timers from "../components/Timers";
import actions from "../actions";

// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => ({
    timers: state.timers
});
  
const mapDispatchToProps = dispatch => ({
    update_timer: (parentId, childId, count, date) => dispatch(actions.update_timer(parentId, childId, count, date)),
    delete_timer: (parentId, childId, inervalId) => dispatch(actions.delete_timer(parentId, childId, inervalId)),
    set_interval: (parentId, childId, intervalId) => dispatch(actions.set_interval(parentId, childId, intervalId)),
    toggle_timer: (parentId, childId) => dispatch(actions.toggle_timer(parentId, childId)),
    update_memo: (parentId, childId, value) => dispatch(actions.update_memo(parentId, childId, value))
});

const TimerList = (props) => {
    return (
        <div className="timer_list">
            {props.timers.map((items,i)=>(
                <Timers
                    update_timer={props.update_timer}
                    delete_timer={props.delete_timer}
                    set_interval={props.set_interval}
                    toggle_timer={props.toggle_timer}
                    update_memo={props.update_memo}
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
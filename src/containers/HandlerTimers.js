import React from "react";
import {connect} from "react-redux";
import Timers from "../components/Timers";
import {update_timer, delete_timer, set_interval} from "../actions";


// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => ({
    timers: state.timers
});
  
const mapDispatchToProps = dispatch => ({
    update_timer: (parentId, childId, count) => dispatch(update_timer(parentId, childId, count)),
    delete_timer: (parentId, childId, inervalId) => dispatch(delete_timer(parentId, childId, inervalId)),
    set_interval: (parentId, childId, intervalId) => dispatch(set_interval(parentId, childId, intervalId))
});

const TimerList = (props) => {
    return (
        <div className="timer_list">
            {props.timers.map((items,i)=>(
                <Timers
                    update_timer={props.update_timer}
                    delete_timer={props.delete_timer}
                    set_interval={props.set_interval}
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
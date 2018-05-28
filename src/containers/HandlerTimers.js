import React from "react";
import {connect} from "react-redux";
import Timers from "../components/Timers";
import {update_timer} from "../actions";


// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => ({
    timers: state.timers
});
  
const mapDispatchToProps = dispatch => ({
    update_timer: (parentId,childId,count) => dispatch(update_timer(parentId, childId, count))
});

const TimerList = (props) => {
    return (
        <div className="timer_list">
            {props.timers.map((items,i)=>(
                <Timers
                    update_timer={props.update_timer}
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
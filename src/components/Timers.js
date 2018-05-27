import React from "react";
import PropTypes from "prop-types";

import Timer from "./Timer";

const Timers = (props) => {
    return (
        // <ul>
        //     {props.items.map((item, i) => (
        //         <li key={"timer-" + props.index + "-" + i}>
        //             <Timer 
        //                 // index = {i}
        //                 data={item}
        //                 // tick={props.tick}
        //                 // set_interval_id = {props.set_interval_id}
        //             />
        //         </li>
        //     ))}
        // </ul>
        <div className="timer_list">
            {props.timers[0].map((items,i)=>(
                <Timer
                    data={props.timers[0]}
                    key={"timer-" + i}
                />
            ))}
        </div>
    )
}

Timers.propTypes = {
    item: PropTypes.array
};

export default Timers;
import React from "react";
import PropTypes from "prop-types";

import Timer from "./Timer";

const Timers = (props) => {
    return (
        <ul>
            {props.items.map((item, i) => (
                <li key={"timer-" + props.index + "-" + i}>
                    <Timer 
                        // index = {i}
                        data={item}
                        update_timer={props.update_timer}
                        delete_timer={props.delete_timer}
                        set_interval={props.set_interval}
                        // tick={props.tick}
                        // set_interval_id = {props.set_interval_id}
                    />
                </li>
            ))}
        </ul>
    )
}

Timers.propTypes = {
    item: PropTypes.array
};

export default Timers;
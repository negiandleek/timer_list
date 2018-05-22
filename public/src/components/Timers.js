import React from "react";
import PropTypes from "prop-types";

import Timer from "./TImer";

const Timers = (props) => {
    return (
        <ul>
            {props.items.map((item, i) => (
                <li key={"timer-" + props.index + "-" + i}>
                    <Timer 
                        data={item}
                        tick={props.tick}
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
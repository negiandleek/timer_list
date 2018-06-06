import _ from "underscore";
import alpha from "./alpha";

let base = {};
_.each(alpha.time_order, function(key, i){
    base[key] = alpha.timer_based[i]
});

export default function convert_time_to_milli(obj){
    let result = _.reduce(
        obj, 
        (memo, value, key) => {
            if(typeof base[key] === "undefined")return memo;
            return memo + (base[key] * value)
        },
        0
    );
    return result;
}
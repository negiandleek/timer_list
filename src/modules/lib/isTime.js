import alpha from "./alpha";
import _ from "underscore";

export default function is_time(time){
    if(time == null || time == ""){
        throw new Error("arguments is null or undefined");
    }
    if(!_.isObject(time) || (_.isObject(time) && _.isArray(time))){
        throw new TypeError("arguments is time object");
    }
    let keys = _.isArray(time)? time: _.keys(time);
    _.each(keys, (key)=>{
        if(alpha.time_units.indexOf(key) === -1 && alpha.time_head_units.indexOf(key) === -1){ 
            console.error("object key must be hours, minutes, seconds, millis or h, m, s, ms");
        }
    });
    return true;
}

is_time({hours: 0});

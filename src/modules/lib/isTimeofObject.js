import alpha from "./alpha";
import _ from "underscore";

export default function is_time_of_object(time){
    if(time == null || time == ""){
        throw new Error("value is null or undefined");
    }
    if(!_.isObject(time)){
        throw new TypeError("value is array or object");
    }
    let keys = _.isArray(time)? time: _.keys(time);
    _.each(keys, (key)=>{
        if(alpha.time_units.indexOf(key) === -1){
            throw new Error("unit must be 'hours' or 'minutes' or 'seconds' or 'millis'");
        }
    });
    return true;
}
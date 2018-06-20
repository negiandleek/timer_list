import alpha from "./alpha";
import identity from "./identity";
import _ from "underscore";

export default function concatenate_time_to_str(time, pad){
    let clock = ["00", "00", "00"];
    let func = typeof pad === "function"? pad: identity;
    if(!_.isObject(time)){
        return time;
    }
    if(!_.isArray(time)){
        _.forEach(time, (value, key)=>{
            let index = alpha.time_order.indexOf(key);
            if(index === -1){
                return void 0;
            }
            clock[index] = func.call(null, String(value));
        });
    }
    return _.reduce(clock, (memo, str)=> memo+str, "");
}
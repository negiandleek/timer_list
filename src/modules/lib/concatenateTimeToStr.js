import alpha from "./alpha";
import identity from "./identity";
import _ from "underscore";

export default function concatenate_time_to_str(obj, pad){
    let clock = ["00", "00", "00"];
    let func = typeof pad === "function"? pad: identity;
    if(!_.isObject(obj)){
        return obj;
    }
    if(!_.isArray(obj)){
        _.forEach(obj, (value, key)=>{
            let index = alpha.time_order.indexOf(key);
            if(index === -1){
                return void 0;
            }
            clock[index] = func.call(null, String(value));
        });
    }
    return _.reduce(clock, (memo, str)=> memo+str, "");
}
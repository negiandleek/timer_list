import alpha from "./alpha";
import identity from "./identity";
import _ from "underscore";

export default function concatenate_time_to_clock(time, pad){
    let func = typeof pad === "function"? pad: identity;
    let ary;

    if(!_.isArray(time) && _.isObject(time)){
        let padded = _.mapObject(time, (val, key)=>{
            let index = alpha.time_units.indexOf(key);
            return func.call(null, String(val), alpha.time_digits[index]);
        });
        ary = _.values(padded);
    }else if(_.isArray(time)){
        ary = time.slice();
    }

    return _.reduce(ary, (memo, str)=> memo+str, "");;
}

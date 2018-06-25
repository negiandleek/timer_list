import _ from "underscore";
import alpha from "./alpha";
import identity from "./identity";

export default function time_to_clock(time, pad){
    let func = typeof pad === "function"? pad: identity;
    let ary;

    if(!_.isArray(time) && _.isObject(time)){
        let padded = _.reduce(alpha.time_units, (memo, key, index)=>{
            memo[key] = func.call(null, String(time[key]), alpha.time_digits[index]);
            return memo
        }, {});
        ary = _.values(padded);
    }else if(_.isArray(time)){
        ary = time.slice();
    }

    return _.reduce(ary, (memo, str)=> memo+str, "");
}
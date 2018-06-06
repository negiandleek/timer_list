import _ from "underscore";
import alpha from "./alpha";

const first = _.map(alpha.time_order,value => value.charAt(0));
const relation = _.object(first, alpha.time_order);
const reg = /[,\s]/g;

// TODO: sort
export default function pad_zero_specific(...args){
    let time = args.splice(0,1)[0];
    let clock = _.range(4).map((i) => "0".repeat(alpha.time_digits[i]));
    let splited = args.join(",").split(reg);
    let unification = _.chain(splited)
        .map(value => relation[value]||value)
        .filter(value => alpha.time_order.indexOf(value) !== -1)
        .value()

    _.each(unification, (value, index)=>{
        clock[alpha.time_order.indexOf(value)] = time[index];
    });

    return clock;
}
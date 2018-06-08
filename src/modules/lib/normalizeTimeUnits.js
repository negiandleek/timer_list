import _ from "underscore";
import alpha from "./alpha";

// h,m,s,ms
let head = _.map(alpha.time_order,value => value.charAt(0));
head[3] += "s";
const relation = _.object(head, alpha.time_order);
const reg = /[,\s]/g;

export default function normalize_time_units(...args){
    let splited = args.join(",").split(reg);
    let unification = _.map(splited, value => relation[value]||value);
    let sorted = _.filter(alpha.time_order, param => unification.indexOf(param) !== -1);

    return sorted;
}
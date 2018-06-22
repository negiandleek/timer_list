import _ from "underscore";
import alpha from "./alpha";

// h,m,s,ms
let head = _.map(alpha.time_units,value => value.charAt(0));
head[3] += "s";
const relation = _.object(head, alpha.time_units);

export default function normalize_unit(unit){
    return relation[unit]||unit;
}
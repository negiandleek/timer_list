import _ from "underscore";
import alpha from "./alpha";

const first = _.map(alpha.time_order,value => value.charAt(0));
const relation = _.object(first, alpha.time_order);
const reg = /[,\s]/g;
let timer_order = alpha.time_order;
timer_order.push("millis");

export default function pad_zero_specific(...args){
    let time = args[0];
    let param = args[1];
    if(_.isObject(time) && !_.isArray(time)){
        let keys = _.map(time, (value, key)=> key);
        let units = _.filter(alpha.time_order, key => keys.indexOf(key) === -1);
        let value = _.map(units, unit => {
            let count = alpha.time_digits[timer_order.indexOf(unit)]
            return _.range(count).map((i) => "0").join("");
        });
        return _.extend({},time, _.object(units, value));
    }

    let clock = _.range(4).map((i) => "0".repeat(alpha.time_digits[i]));
    return _.map(alpha.time_order, (unit, i) => {
        let index = param.indexOf(unit);
        return index !== -1? time[index]: "0".repeat(alpha.time_digits[i])
    });
}
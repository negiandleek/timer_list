import _ from "underscore";
import alpha from "./alpha";

let timer_order = alpha.time_order;
timer_order.push("millis");

// not use?
export default function pad_zero_specific(...args){
    let time = args[0];
    let param = args[1];
    if(_.isObject(time) && !_.isArray(time)){
        let keys = _.map(time, (value, key)=> key);
        let units = _.filter(alpha.time_order, key => keys.indexOf(key) === -1);
        let value = _.map(units, unit => {
            let count = alpha.time_digits[timer_order.indexOf(unit)]
            return _.range(count).map(() => "0").join("");
        });
        return _.extend({},time, _.object(units, value));
    }

    return _.map(alpha.time_order, (unit, i) => {
        let index = param.indexOf(unit);
        return index !== -1? time[index]: "0".repeat(alpha.time_digits[i])
    });
}
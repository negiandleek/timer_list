import _ from "underscore";
import alpha from "./alpha";

const first = _.map(alpha.time_order,value => value.charAt(0));
const relation = _.object(first, alpha.time_order);
const reg = /[,\s]/g;
let timer_order = alpha.time_order;
timer_order.push("millis");

// TODO: sort
export default function pad_zero_specific(...args){
    let time = args.splice(0,1)[0];

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
import _ from "underscore";
import alpha from "./alpha";

const first = _.map(alpha.time_order,value => value.charAt(0));
const relation = _.object(first, alpha.time_order);

export default function normalize_name_follow_time(time){
    if(!_.isArray(time) && _.isObject(time)){
        let new_obj = {};
        _.each(time, function(value, key, time){
            if(typeof this[key] !== "undefined")return;
            let param = relation[key]? relation[key]: key;
            if(alpha.time_order.indexOf(param) === -1)return;
            new_obj[param] = value
        },new_obj)
        
        return new_obj;
    }
    let unification = _.chain(time)
        .map(value => relation[value]||value)
        .filter(function(value,index,list){
            let included = alpha.time_order.indexOf(value) !== -1;
            let exists = (typeof this[value] === "undefined")
            this[value] = value;
            return included && exists;
        }.bind({}))
        .value()

    return unification;
}
import _ from "underscore";
import alpha from "./alpha";

const first = _.map(alpha.time_order,value => value.charAt(0));
const relation = _.object(first, alpha.time_order);

// TODO:refactoring
export default function normalize_name_follow_time(obj){
    if(!_.isArray(obj) && _.isObject(obj)){
        let new_obj = {};
        _.each(obj, function(value, key, obj){
            if(typeof this[key] !== "undefined")return;
            let param = relation[key]? relation[key]: key;
            if(alpha.time_order.indexOf(param) === -1)return;
            new_obj[param] = value
        },new_obj)
        
        return new_obj;
    }
    let unification = _.chain(obj)
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
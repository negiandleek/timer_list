import _ from "underscore";
import alpha from "./alpha";
import to_bool from "./toBool";
// h,m,s,ms
let head = _.map(alpha.time_units,value => value.charAt(0));
head[3] += "s";
const relation = _.object(head, alpha.time_units);
const reg = /[,]/g;

export default function normalize_time_units(){
    let pro = _.chain(arguments).map((args)=>{
        if(!_.isArray(args)){
            return args.split(reg)
        }else{
            return args;
        }
    }).flatten().value();

    let unification = _.map(pro, value => relation[value]||value);
    let sorted = _.filter(alpha.time_units, param => unification.indexOf(param) !== -1);
    return sorted;
}


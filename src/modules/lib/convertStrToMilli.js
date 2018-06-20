import _ from "underscore";
import alpha from "./alpha";
import check_past from "./check_past";

let order = alpha.time_order.slice();
let methods = order.map((str)=>{
    return str.replace(/^(.){1}/, (s)=>s.toUpperCase())
})
methods[3]="Milliseconds"

function convert(time, clock, startIndex = -2, count = 0){
    let temp = time;
    if(clock.length < -1 * startIndex) return temp;
    temp[temp.length - (1 + count)] = clock.substr(startIndex, 2);
    return convert(temp, clock, startIndex - 2, count + 1);
}

//TODO: {h: 1, m: 1} -> {h: 3600000, m: 60000}
export default function convert_str_to_milli(value, alarm_flag=false){
    if(!alarm_flag){
        // hour,minute,second;
        let time = [0,0,0];
        let result = convert(time, value);
        return _.reduce(
            result, 
            (memo, num, index) => memo + (Number(num) * alpha.time_based[index]), 
            0
        );
    }else{
        let feature_date = value.split(alpha.time_split).map(Number);
        let padding = new Array(methods.length - feature_date.length).fill(0)
        let time_ary = feature_date.concat(padding);
        let feature = new Date();
        methods.forEach((name,i)=>{
            feature["set" + name](time_ary[i])
        });
        if(check_past(feature)){
            feature = new Date(feature.setDate(feature.getDate() + 1))
        }
        return feature.getTime();
    }
}
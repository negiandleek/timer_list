import alpha from "./alpha";
import is_time_of_string from "./isTimeOfString";
import is_tommorow from "./isTommorow";
import convert_str_to_milli from "./convertStrToMilli";
import convert_milli_to_time from "./convertMilliToTime";
import convert_time_to_milli from "./convertTimeToMilli";

let order = alpha.time_order.slice();
order = order.map((str)=>{
    return str.replace(/^(.){1}/, (s)=>s.toUpperCase())
})
order[3]="Milliseconds"

export default function generate_in_date_time(value, alarm=true){
    let in_date_time = new Date();

    if(!alarm){
        is_time_of_string(value);
        let n = convert_str_to_milli(value);
        let m = convert_milli_to_time(n);
        let l = convert_time_to_milli(m);
        in_date_time = new Date(new Date().getTime() + l);
    }else{
        let tommorow_flag = is_tommorow(value);
        let target_date = value.split(alpha.time_split).map(Number);
        let padding = new Array(order.length - target_date.length).fill(0)
        target_date = target_date.concat(padding);

        if(tommorow_flag){
            in_date_time = new Date(in_date_time.setDate(in_date_time.getDate() + 1));
        }
        order.forEach((name,i)=>{
            in_date_time["set" + name](target_date[i])
        })
    }
    return in_date_time;
}
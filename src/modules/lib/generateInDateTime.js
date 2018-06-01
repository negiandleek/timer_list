import alpha from "./alpha";
import is_time_of_string from "./isTimeOfString";
import is_tommorow from "./isTommorow";
import convert_alarm_to_time_left from "./convertAlarmToTimeLeft";
import convert_str_to_time from "./convertStrToTime";
import convert_time_to_milli from "./convertTimeToMilli";

let order = alpha.time_order.slice();
order = order.map((str)=>{
    return str.replace(/^(.){1}/, (s)=>s.toUpperCase())
})
order[3]+="econds";

export default function generate_in_date_time(value, alarm=true){
    let in_date_time = new Date();

    if(!alarm){
        is_time_of_string(value);
        let n = convert_str_to_time(value);
        let m = convert_time_to_milli(n);
        in_date_time = new Date(new Date().getTime() + m);
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
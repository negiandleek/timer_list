import alpha from "./alpha";
import is_time from "./isTime";
import is_tommorow from "./isTommorow";
import convert_alarm_to_time_left from "./convertAlarmToTimeLeft";

let order = alpha.time_order.slice();
order = order.map((str)=>{
    return str.replace(/^(.){1}/, (s)=>s.toUpperCase())
})
order[3]+="econds";

export default function generate_alarm(value){
    is_time(value);
    let alarm = new Date();
    let tommorow_flag = is_tommorow(value);
    let target_date = value.split(alpha.time_split).map(Number);
    let padding = new Array(order.length - target_date.length).fill(0)
    target_date = target_date.concat(padding);

    if(tommorow_flag){
        alarm = new Date(alarm.setDate(alarm.getDate() + 1));
    }
    order.forEach((name,i)=>{
        alarm["set" + name](target_date[i])
    })

    convert_alarm_to_time_left(alarm);
}
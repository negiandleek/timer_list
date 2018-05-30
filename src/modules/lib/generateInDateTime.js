import alpha from "./alpha";
import is_time from "./isTime";
import is_tommorow from "./isTommorow";
import convert_alarm_to_time_left from "./convertAlarmToTimeLeft";

let order = alpha.time_order.slice();
order = order.map((str)=>{
    return str.replace(/^(.){1}/, (s)=>s.toUpperCase())
})
order[3]+="econds";

export default function generate_in_date_time(value, alarm=true){
    if(alarm){
        is_time(value);
    }else{
        
    }
    let in_date_time = new Date();
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

    return in_date_time;
}

generate_in_date_time("1650")
import convert_milli_to_time from "./convertMilliToTime";
import concatenate_time from "./concatenateTime";

export default function convert_alarm_to_time_left(date){
    let milliseconds_left = date.getTime() - new Date().getTime();
    let obj = convert_milli_to_time(milliseconds_left);
    return concatenate_time(obj);
}
import _ from "underscore";
import is_time from "./isTime";
import concatenate_time from "./concatenateTime";
import convert_time_to_milli from "./convertTimeToMilli";
import convert_str_to_time from "./convertStrToTime";
import convert_milli_to_time from "./convertMilliToTime";
import pad_zero from "./padZero";

export default function forward_time(value, num = 100){
    this.is_time(value)

    // if(!_.isNumber(num) || isNaN(value)){
    //     return false;
    // }
    let convertd_time = convert_str_to_time(value);
    let millis = convert_time_to_milli(convertd_time);
    let forwarded_date = pad_zero(convert_milli_to_time(Number(millis) + num), 2);
    let concatenation_time = concatenate_time(forwarded_date);

    if(concatenation_time < 0){
        return concatenation_time;
    }

    let date = this.pad_zero(this.convert_str_to_time(concatenation_time),2);
    let time = concatenate_time(date);

    return time.slice(-1 * value.length);
}
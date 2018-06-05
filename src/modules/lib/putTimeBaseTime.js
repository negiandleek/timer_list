import _ from "underscore";
import is_time_of_string from "./isTimeOfString";
import concatenate_time_to_str from "./concatenateTimeToStr";
import convert_time_to_milli from "./convertTimeToMilli";
import convert_str_to_milli from "./convertStrToMilli";
import convert_milli_to_time from "./convertMilliToTime";
import pad_zero from "./padZero";
import echo from "./echo"

export default function put_time_base_time(clock, value = "1000"){
    is_time_of_string(clock);
    
    if(!_.isNumber(value) && _.isNaN(Number(value))){
        return clock;
    }

    let converted_milli = convert_str_to_milli(clock);
    let converted_time = convert_milli_to_time(converted_milli);
    let millis = convert_time_to_milli(converted_time);
    
    // if(Number(millis) < Number(value)){
    //     return clock;
    // }

    let time = convert_milli_to_time(Number(millis) + Number(value));
    let forward_date = pad_zero(time, 2);
    let concatenation_time = concatenate_time_to_str(forward_date);

    if(concatenation_time < 0){
        return concatenation_time;
    }

    let converted_milli_ = convert_str_to_milli(concatenation_time);
    let converted_time_ = convert_milli_to_time(converted_milli_);
    let date = pad_zero((converted_time_),2);
    let time_ = concatenate_time_to_str(date);
    return time_.slice(-1 * clock.length);
}

var hoge = put_time_base_time("6000", "-60000")
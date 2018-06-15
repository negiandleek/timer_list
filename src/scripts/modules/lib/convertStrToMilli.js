import _ from "underscore";
import alpha from "./alpha";
import is_time_of_string from "./isTimeOfString";
import convert_milli_time from "./convertMilliToTime";

function convert(time, clock, startIndex = -2, count = 0){
    let temp = time;
    if(clock.length < -1 * startIndex) return temp;
    temp[temp.length - (1 + count)] = clock.substr(startIndex, 2);
    return convert(temp, clock, startIndex - 2, count + 1);
}

export default function convert_str_to_milli(value){
    is_time_of_string(value)
    // hour,minute,second;
    let time = [0,0,0];
    let result = convert(time, value);
    return _.reduce(
        result, 
        (memo, num, index) => memo + (Number(num) * alpha.timer_based[index]), 
        0
    );
}
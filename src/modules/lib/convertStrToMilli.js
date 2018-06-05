import is_time_of_string from "./isTimeOfString";
import convert_milli_time from "./convertMilliToTime";

export default function convert_str_to_milli(value){
    is_time_of_string(value)

    // hour,minute,second;
    let time = [0,0,0];
    let based = [60 * 60 * 1000, 60 * 1000, 1000];
    let result = 0;

    function convert(time, startIndex = -2, count = 0){
        if(value.length < -1 * startIndex)return;
        time[time.length - (1 + count)] = value.substr(startIndex, 2);
        convert(time, startIndex - 2, count + 1);
    }
    convert(time);

    time.forEach((str,i) => {result += Number(str) * based[i]});

    return result;
}
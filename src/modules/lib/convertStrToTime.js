import is_time from "./isTime";
import convert_milli_time from "./convertMilliToTime";

export default function convert_str_to_time(value){
    this.is_time(value)

    // hour,minute,second;
    let time = [0,0,0];
    let based = [60 * 60 * 100, 60 * 100, 100];
    let result = 0;

    function convert(time, startIndex = -2, count = 0){
        if(value.length < -1 * startIndex)return;
        time[time.length - (1 + count)] = value.substr(startIndex, 2);
        convert(time, startIndex - 2, count + 1);
    }
    convert(time);

    time.forEach((str,i) => {result += Number(str) * based[i]});

    return convert_milli_time(result);
}
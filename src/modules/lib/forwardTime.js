import _ from "underscore";
import pad_zero from "./padZero";
import convert_str_to_time from "./convertStrToTime";

export default function forward_time(value, num = 1){
    this.is_time(value)

    // if(!_.isNumber(num) || isNaN(value)){
    //     return false;
    // }
    let n = Number(value) + num;
    if(n < 0){
        return n;
    }
    let m = this.pad_zero(n, 4);
    let l = this.convert_str_to_time(m, 2);
    let r = this.pad_zero(l);
    let time = r.hours + r.minutes + r.seconds;

    return time.slice(-1 * value.length);
}
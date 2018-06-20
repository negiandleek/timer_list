import str_to_milli from "../lib/convertStrToMilli";
import is_str from "../lib/isTimeOfString";
import milli_to_time from "../lib/convertMilliToTime";
import time_to_str from "../lib/concatenateTimeToStr";
import pad_zero from "../lib/padZero";

export default function generate_timer(clock, alarm=false, index=0){
    is_str(clock);
    let a = str_to_milli(clock, alarm, index);
    let b = milli_to_time(a);
    let c = time_to_str(b,pad_zero);
    return c;
}
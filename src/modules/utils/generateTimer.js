import _ from "underscore";
import str_to_milli from "../lib/convertStrToMilli";
import is_str from "../lib/isTimeOfString";
import milli_to_time from "../lib/convertMilliToTime";
import time_to_str from "../lib/concatenateTimeToStr";
import pad_zero from "../lib/padZero";

// index is from (hours -> 0, minutes -> 1, seconds -> 2, minutes -> 3)
export default function generate_timer(clock, alarm=false, index=0){
    let composed = _.compose(
        (time)=>time_to_str(time, pad_zero),
        (ms)=>milli_to_time(ms),
        ()=>str_to_milli(clock, alarm, index),
        ()=>is_str(clock)
    )
    return composed();
}
import _ from "underscore";

import clock_to_milli from "../lib/clockToMilli";
import pad_time from "../lib/padTime";
import pad_zero from "../lib/padZero";
import milli_to_time from "../lib/milliToTime";
import slice_clock from "../lib/sliceClock";
import time_to_clock from "../lib/timeToClock";

import is_time from "../lib/isTime";
import is_clock from "../lib/isClock";
import is_numeric from "../lib/isNumeric";

export default function calc_base_time(value, sub = {seconds: 1}, start=0, end=1){
    let subject;
    let target;
    let obj_flag = false;

    if(_.isObject(value)){
        is_time(value);
        subject = time_to_clock(pad_time(value), pad_zero);
        obj_flag = true;
    }else{
        is_clock(value);
        subject = value;
    }
    subject = clock_to_milli(subject)

    if(_.isObject(sub)){
        is_time(sub);
        target = time_to_clock(pad_time(sub), pad_zero);
        target = clock_to_milli(target);
    }else{
        is_numeric(sub);
        target = sub;
    }

    let result = parseInt(subject,10) + parseInt(target, 10)

    if(result < 0){
        return 0;
    }
    let time = milli_to_time(result);
    if(obj_flag){
        return time
    }else{
        return slice_clock(time_to_clock(time, pad_zero), start, end)
    }
}
import _ from "underscore";

import alpha from "../lib/alpha";
import calculation from  "../lib/putTimeBaseTen";
import clock_to_time from "../lib/clockToTime";
import milli_to_time from "../lib/milliToTime";
import pad_zero from "../lib/padZero";
import pad_time from "../lib/padTime";
import time_to_clock from "../lib/timeToClock";
import slice_clock from "../lib/sliceClock";

import is_clock from "../lib/isClock";
import is_time from "../lib/isTime";
import is_numeric from "../lib/isNumeric";

export default function calc_base_ten(value, sub={seconds: 1}, start=0, end=1){
    let subject;
    let target;
    let clock_flag = false;

    if(_.isObject(value)){
        is_time(value);
        subject = pad_time(value);
    }else{
        is_clock(value);
        subject = clock_to_time(value, start, end);
        clock_flag = true;
    }
    
    if(_.isObject(sub)){
        is_time(sub);
        target = pad_time(sub);
    }else{
        is_numeric(sub);
        target = milli_to_time(sub);
    }
    
    let result = calculation(subject, target);
    
    if(result < 0){
        result = alpha.clock_init;
    }

    if(clock_flag){
        return slice_clock(time_to_clock(result, pad_zero), start, end);
    }else{
        return result;
    }
}
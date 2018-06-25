import _ from "underscore";

import pad_zero from "./padZero";
import time_to_clock from "./timeToClock";

import clock_to_milli from "./clockToMilli";
import milli_to_time from "./milliToTime";
import time_to_milli from "./timeToMilli";
import slice_clock from "./sliceClock";

export default function calc_base_time(clock, millis = "1000", start=0, end=1){
    let result = _.compose(
        (time)=>time_to_clock(time),
        (time)=>{
            return _.mapObject(time, (ms)=> pad_zero(ms, 2))
        },
        (ms)=>milli_to_time(parseInt(ms,10) + parseInt(millis,10)),
        (time)=>time_to_milli(time),
        (ms)=>milli_to_time(ms),
        (clock)=>clock_to_milli(clock, false, start)
    )(clock);

    if(result < 0){
        return 0;
    }

    return _.compose(
        (clock)=>slice_clock(clock, start, end),
        (time)=>time_to_clock(time),
        (time)=>{
            return _.mapObject(time, (ms, key)=> pad_zero(ms, 2));
        },
        (ms)=>milli_to_time(ms),
        (clock)=>clock_to_milli(clock)
    )(result);
}
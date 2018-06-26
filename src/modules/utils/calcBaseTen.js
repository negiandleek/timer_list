import _ from "underscore";

import calculation from  "../lib/putTimeBaseTen";
import pad_zero from "../lib/padZero";
import time_to_clock from "../lib/timeToClock";
import milli_to_time from "../lib/milliToTime";
import slice_clock from "../lib/sliceClock";
import to_time from "../lib/clockToTime";

export default function calc_base_ten(clock, ms, start=0, end=1){
    let sign = Math.sign(parseInt(ms,10));
    let origin = to_time(clock, start, end);
    let calc = _.compose(
        (clock)=>to_time(clock, start, end),
        (clock)=>slice_clock(clock, start, end),
        (time)=>time_to_clock(time, pad_zero),
        (ms)=>milli_to_time(Math.abs(ms)),
    )(ms);
    return calculation(origin, calc, sign);
}
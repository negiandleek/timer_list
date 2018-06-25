import _ from "underscore";
import is_numeric from "../lib/isNumeric";
import milli_to_time from "../lib/convertMilliToTime";
import concatenate_time_to_clock from "../lib/concatenateTimeToClock";
import slice_clock from "../lib/sliceClock";
import to_time from "../lib/convertClockToTime";
import pad_zero from "../lib/padZero";
import calculation from  "../lib/putTimeBaseTen";

export default function calc_base_ten(clock, ms, start=0, end=1){
    is_numeric(clock, ms);
    let sign = Math.sign(parseInt(ms,10));
    let origin = to_time(clock, start, end);
    let calc = _.compose(
        (clock)=>to_time(clock, start, end),
        (clock)=>slice_clock(clock, start, end),
        (time)=>concatenate_time_to_clock(time, pad_zero),
        (ms)=>milli_to_time(Math.abs(ms)),
    )(ms);
    return calculation(origin, calc, sign);
}

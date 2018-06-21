import _ from "underscore";
import diff_date_millis from "../lib/getDiffDateMillis";
import milli_to_time from "../lib/convertMilliToTime";
import time_to_clock from "../lib/concatenateTimeToClock";
import pad_zero from "../lib/padZero";
import slice_clock from "../lib/sliceClock";

export default function get_count(dms, start=0, end=1){
    let composed = _.compose(
        (clock)=>slice_clock(clock, start, end),
        (time)=>time_to_clock(time, pad_zero),
        (ms)=>milli_to_time(ms),
        ()=>diff_date_millis(dms),
    )
    return composed();
}
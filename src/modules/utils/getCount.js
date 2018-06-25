import _ from "underscore";

import pad_zero from "../lib/padZero";
import time_to_clock from "../lib/timeToClock";

import diff_generate_dms from "../lib/diffDMs";
import milli_to_time from "../lib/milliToTime";
import slice_clock from "../lib/sliceClock";

export default function get_count(dms, start=0, end=1){
    let composed = _.compose(
        (clock)=>slice_clock(clock, start, end),
        (time)=>time_to_clock(time, pad_zero),
        (ms)=>milli_to_time(ms),
        ()=>diff_generate_dms(dms),
    )
    return composed();
}
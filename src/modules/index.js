/*
{
    "name": "ticktack",
    "version": "1.0.0"
}
*/

import is_time from "./lib/isTime";

import concatenate_time from "./lib/concatenateTime";
import convert_milli_to_time from "./lib/convertMilliToTime";
import convert_str_to_time from "./lib/convertStrToTime";
import convert_time_to_milli from "./lib/convertTimeToMilli";
import display from "./lib/display";
import pad_zero from "./lib/padZero";
import print from "./lib/print";
import put_time_base_time from "./lib/putTimeBaseTime";
import put_time_base_ten from "./lib/putTimeBaseTen";
import shift_time_to_input from "./lib/shiftTimeToInput";
import undisplay from "./lib/undisplay";

const ticktack = {
    is_time,
    concatenate_time,
    convert_milli_to_time,
    convert_time_to_milli,
    convert_str_to_time,
    display,
    pad_zero,
    print,
    put_time_base_time,
    put_time_base_ten,
    shift_time_to_input,
    undisplay
}

export default ticktack;
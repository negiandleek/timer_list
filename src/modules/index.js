/*
{
    "name": "ticktack",
    "version": "1.0.0"
}
*/

import is_time from "./lib/isTime";
import convert_milli_to_time from "./lib/convertMilliToTime";
import convert_str_to_time from "./lib/convertStrToTime";
import display from "./lib/display";
import forward_time from "./lib/forwardTime";
import pad_zero from "./lib/padZero";

const ticktack = {
    is_time,
    convert_milli_to_time,
    convert_str_to_time,
    display,
    forward_time,
    pad_zero
}

export default ticktack;

/*
{
    "name": "ticktack",
    "version": "1.0.0"
}
*/
import alpha from "./lib/alpha";
import is_time from "./lib/isTime";
import is_tommorow from "./lib/isTommorow";
import concatenate_time from "./lib/concatenateTime";
import convert_alarm_to_time_left from "./lib/convertAlarmToTimeLeft";
import convert_milli_to_time from "./lib/convertMilliToTime";
import convert_str_to_time from "./lib/convertStrToTime";
import convert_time_to_milli from "./lib/convertTimeToMilli";
import display from "./lib/display";
import echo from "./lib/echo";
import generate_alarm from "./lib/generateAlarm";
import pad_zero from "./lib/padZero";
import put_time_base_time from "./lib/putTimeBaseTime";
import put_time_base_ten from "./lib/putTimeBaseTen";
import shift_time_to_input from "./lib/shiftTimeToInput";
import undisplay from "./lib/undisplay";

const ticktack = {
    alpha,
    is_time,
    is_tommorow,
    concatenate_time,
    convert_alarm_to_time_left,
    convert_milli_to_time,
    convert_time_to_milli,
    convert_str_to_time,
    display,
    echo,
    generate_alarm,
    pad_zero,
    put_time_base_time,
    put_time_base_ten,
    shift_time_to_input,
    undisplay
}

export default ticktack;

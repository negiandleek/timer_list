/*
{
    "name": "ticktack",
    "version": "1.0.0"
}
*/
import alpha from "./lib/alpha";
import concatenate_time_to_str from "./lib/concatenateTimeToStr";
import convert_milli_to_time from "./lib/convertMilliToTime";
import convert_str_to_milli from "./lib/convertStrToMilli";
import convert_time_to_milli from "./lib/convertTimeToMilli";
import display from "./lib/display";
import echo from "./lib/echo";
import generate_in_date_time from "./lib/generateInDateTime";
import identity from "./lib/identity";
import is_time_of_object from "./lib/isTimeofObject";
import is_time_of_string from "./lib/isTimeOfString";
import is_tommorow from "./lib/isTommorow";
import pad_zero from "./lib/padZero";
import put_time_base_time from "./lib/putTimeBaseTime";
import put_time_base_ten from "./lib/putTimeBaseTen";
import shift_time_to_input from "./lib/shiftTimeToInput";
import slice_time_of_string from "./lib/sliceTimeOfString";
import undisplay from "./lib/undisplay";

const ticktack = {
    alpha,
    concatenate_time_to_str,
    convert_milli_to_time,
    convert_time_to_milli,
    convert_str_to_milli,
    display,
    echo,
    generate_in_date_time,
    is_time_of_object,
    is_time_of_string,
    is_tommorow,
    pad_zero,
    put_time_base_time,
    put_time_base_ten,
    shift_time_to_input,
    slice_time_of_string,
    undisplay
}

export default ticktack;

// TODO:
// 必要なタイムを自由に取得できるように拡張する
// hours, minutes, seconds, millis対応
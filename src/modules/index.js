/*
{
    "name": "whiterabbit",
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
import generate_date from "./lib/generateDate";
import identity from "./lib/identity";
import is_numeric from "./lib/isNumeric";
import is_time_of_object from "./lib/isTimeofObject";
import is_time_of_string from "./lib/isTimeOfString";
import is_past from "./lib/isPast";
import normalize_name_follow_time from "./lib/normalizeNameFollowTime";
import normalize_time_units from "./lib/normalizeTimeUnits";
import pad_zero from "./lib/padZero";
import pad_zero_specific from "./lib/padZeroSpecific";
import put_time_base_time from "./lib/putTimeBaseTime";
import put_time_base_ten from "./lib/putTimeBaseTen";
import shift_time_to_input from "./lib/shiftTimeToInput";
import slice_time_of_string from "./lib/sliceTimeOfString";
import undisplay from "./lib/undisplay";

const whiterabbit = {
    alpha,
    concatenate_time_to_str,
    convert_milli_to_time,
    convert_time_to_milli,
    convert_str_to_milli,
    display,
    echo,
    generate_date,
    is_numeric,
    is_time_of_object,
    is_time_of_string,
    is_past,
    normalize_name_follow_time,
    pad_zero,
    pad_zero_specific,
    put_time_base_time,
    put_time_base_ten,
    shift_time_to_input,
    slice_time_of_string,
    normalize_time_units,
    undisplay
}

export default whiterabbit;

// TODO:
// 必要なタイムを自由に取得できるように拡張する
// hours, minutes, seconds, millis対応
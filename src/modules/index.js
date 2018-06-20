/*
{
    "name": "whiterabbit",
    "version": "1.0.0"
}
*/
import alpha from "./lib/alpha";
import check_past from "./lib/check_past";
import concatenate_time_to_str from "./lib/concatenateTimeToStr";
import convert_milli_to_time from "./lib/convertMilliToTime";
import convert_str_to_milli from "./lib/convertStrToMilli";
import convert_time_to_milli from "./lib/convertTimeToMilli";
import display from "./lib/display";
import generate_date from "./lib/generateDate";
import is_numeric from "./lib/isNumeric";
import is_time_of_object from "./lib/isTimeOfObject";
import is_time_of_string from "./lib/isTimeOfString";
import normalize_name_follow_time from "./lib/normalizeNameFollowTime";
import normalize_time_units from "./lib/normalizeTimeUnits";
import pad_zero from "./lib/padZero";
import pad_zero_specific from "./lib/padZeroSpecific";
import put_time_base_time from "./lib/putTimeBaseTime";
import put_time_base_ten from "./lib/putTimeBaseTen";
import shift_time_to_input from "./lib/shiftTimeToInput";
import slice_time_of_string from "./lib/sliceTimeOfString";
import undisplay from "./lib/undisplay";

import generateTimer from "./utils/generateTimer";

const whiterabbit = {
    alpha,
    check_past,
    concatenate_time_to_str,
    convert_milli_to_time,
    convert_time_to_milli,
    convert_str_to_milli,
    display,
    generate_date,
    is_numeric,
    is_time_of_object,
    is_time_of_string,
    normalize_name_follow_time,
    pad_zero,
    pad_zero_specific,
    put_time_base_time,
    put_time_base_ten,
    shift_time_to_input,
    slice_time_of_string,
    normalize_time_units,
    undisplay,

    // units
    generateTimer
}

export default whiterabbit;

// TODO:
// 必要なタイムを自由に取得できるように拡張する
// millis対応

// clock -> "0000"
// time -> {} or [];
// unit -> "hours","minutes","seconds","millis";
// units -> ["hours", "minutes","seconds","millis"];
// date -> Date type;
// millis -> millis
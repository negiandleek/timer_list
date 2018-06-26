/*
{
    "name": "whiterabbit",
    "version": "1.0.0"
}
*/
import alpha from "./lib/alpha";
import calc_base_ten from "./utils/calcBaseTen";
import calc_base_time from "./utils/calcBaseTime";
import check_past from "./lib/check_past";
import exist_units from "./lib/existUnits";
import is_numeric from "./lib/isNumeric";
import is_time from "./lib/isTime";
import is_clock from "./lib/isClock";
import normalize_units from "./lib/normalizeUnits";
import pad_units from "./lib/padUnits";
import pad_zero from "./lib/padZero";
import put_time_base_ten from "./lib/putTimeBaseTen";
import time_to_clock from "./lib/timeToClock";

import clock_to_milli from "./lib/clockToMilli";
import clock_to_time from "./lib/clockToTime";
import diff_generate_dms from "./lib/diffDMs";
import display from "./utils/display";
import generate_dms from "./lib/generateDMs";
import get_count from "./utils/getCount";
import get_date from "./utils/getDate";
import milli_to_time from "./lib/milliToTime";
import shift_time_to_input from "./lib/shiftTimeToInput";
import slice_clock from "./lib/sliceClock";
import time_to_milli from "./lib/timeToMilli";
import undisplay from "./utils/undisplay";

const whiterabbit = {
    alpha,
    check_past,
    display,
    exist_units,
    is_numeric,
    is_time,
    is_clock,
    normalize_units,
    pad_units,
    pad_zero,
    put_time_base_ten,

    // api
    time_to_clock,
    clock_to_time,
    milli_to_time,
    time_to_milli,
    clock_to_milli,
    calc_base_ten,
    calc_base_time,
    display,
    diff_generate_dms,
    generate_dms,
    get_count,
    get_date,
    shift_time_to_input,
    slice_clock,
    undisplay,
}

export default whiterabbit;

// clock -> "0000"
// time -> {} or [];
// units -> ["hours", "minutes","seconds","millis"];
// date -> new Date().getTime(). date mills or dms;
// millis -> millis or dms
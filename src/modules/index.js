/*
{
    "name": "whiterabbit",
    "version": "1.0.0"
}
*/
// import alpha from "./lib/alpha";
// import check_past from "./lib/checkPast";
// import clock_to_milli from "./lib/clockToMilli";
// import clock_to_time from "./lib/clockToTime";
// import diff_dms from "./lib/diffDMs";
// import exist_units from "./lib/existUnits";
// import generate_dms from "./lib/generateDMs";
// import is_clock from "./lib/isClock";
// import is_numeric from "./lib/isNumeric";
// import is_time from "./lib/isTime";
// import milli_to_time from "./lib/milliToTime";
// import normalize_units from "./lib/normalizeUnits";
// import pad_time from "./lib/padTime";
// import pad_units from "./lib/padUnits";
// import pad_zero from "./lib/padZero";
// import put_time_base_ten from "./lib/putTimeBaseTen";
// import shift_clock from "./lib/shiftClock";
// import slice_clock from "./lib/sliceClock";
// import time_to_clock from "./lib/timeToClock";
// import time_to_milli from "./lib/timeToMilli";

import calc_base_ten from "./utils/calcBaseTen";
import calc_base_time from "./utils/calcBaseTime";
import clock_to_milli from "./utils/composeClockToMilli";
import clock_to_time from "./utils/composeClockToTime";
import diff_dms from "./utils/composeDiffDMs";
import generate_dms from "./utils/composeGenerateDMs";
import milli_to_time from "./utils/composeMilliToTime";
import shift_clock from "./utils/composeShiftClock";
import time_to_clock from "./utils/composeTimeToClock";
import display from "./utils/display";
import get_count from "./utils/getCount";
import get_date from "./utils/getDate";
import undisplay from "./utils/undisplay";

const whiterabbit = {
    calc_base_ten,
    calc_base_time,
    clock_to_milli,
    clock_to_time,
    diff_dms,
    generate_dms,
    milli_to_time,
    shift_clock,
    time_to_clock,
    display,
    get_count,
    get_date,
    undisplay
}

export default whiterabbit;

// clock -> "0000"
// time -> {} or [];
// units -> ["hours", "minutes","seconds","millis"];
// date -> new Date().getTime(). date mills or dms;
// millis -> millis or dms
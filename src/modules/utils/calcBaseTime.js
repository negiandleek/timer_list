import _ from "underscore";
import time_to_clock from "../lib/concatenateTimeToClock";
import time_to_milli from "../lib/convertTimeToMilli";
import str_to_milli from "../lib/convertStrToMilli";
import milli_to_time from "../lib/convertMilliToTime";
import slice_clock from "../lib/sliceClock";
import pad_zero from "../lib/padZero";

export default function put_time_base_time(clock, millis = "1000", start=0, end=1){
    let result = _.compose(
        (time)=>time_to_clock(time),
        (time)=>{
            return _.mapObject(time, (ms)=> pad_zero(ms, 2))
        },
        (ms)=>milli_to_time(parseInt(ms,10) + parseInt(millis,10)),
        (time)=>time_to_milli(time),
        (ms)=>milli_to_time(ms),
        (clock)=>str_to_milli(clock, false, start)
    )(clock);

    if(result < 0){
        return 0;
    }

    return _.compose(
        (clock)=>slice_clock(clock, start, end),
        (time)=>time_to_clock(time),
        (time)=>{
            return _.mapObject(time, (ms, key)=> pad_zero(ms, 2));
        },
        (ms)=>milli_to_time(ms),
        (clock)=>str_to_milli(clock)
    )(result);
}
import time_to_clock from "../lib/timeToClock";
import is_time from "../lib/timeToClock";
import pad_zero from "../lib//padZero";

export default function compose_time_to_clock(time, pad=pad_zero){
    is_time(time);
    return time_to_clock(time, pad);
}
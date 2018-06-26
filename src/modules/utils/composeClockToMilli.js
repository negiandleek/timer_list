import is_clock from "../lib/isClock";
import clock_to_milli from "../lib/clockToMilli";

export default function compose_clock_to_milli(clock, start=0, alarm=false){
    is_clock(clock);
    return clock_to_milli(clock, alarm, start);
}
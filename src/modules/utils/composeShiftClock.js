import is_clock from "../lib/isClock";
import shift_clock from "../lib/shiftClock";

export default function compose_shift_time_to_input(prev, next){
    is_clock(prev, next);
    return shift_clock(prev, next);
}
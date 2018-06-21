import _ from "underscore";
import str_to_milli from "../lib/convertStrToMilli";
import is_str from "../lib/isTimeOfString";
import generate_date_millis from "../lib/generateDateMillis";

export default function get_date(clock, alarm=false, start=0){
    let composed;
    if(!alarm){
        composed = _.compose(
            (ms)=>generate_date_millis(ms),
            ()=>str_to_milli(clock, false, start),
            ()=>is_str(clock)
        )
    }else{
        composed = _.compose(
            ()=>str_to_milli(clock, true, start),
            ()=>is_str(clock)
        )
    }
    return composed();
}
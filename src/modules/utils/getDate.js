import _ from "underscore";
import str_to_milli from "../lib/convertStrToMilli";
import is_clock from "../lib/isClock";
import generate_date_millis from "../lib/generateDateMillis";
import normalize_units from "../lib/normalizeUnits";
import exist_units from "../lib/existUnits";
import pad_units from "../lib/padUnits";
import slice_clock from "../lib/sliceClock";
import time_to_clock from "../lib/concatenateTimeToClock";
import pad_zero from "../lib/padZero";

export default function get_date(value, alarm=false, start=0){
    let clock = value;

    if(_.isObject(clock) && !_.isArray(clock)){
        let normalized = _.reduce(clock, (result, value, key)=>{
            let unit = normalize_units(key);
            if(!result[unit]){
                result[unit] = value;
            }
            return result;
        }, {});
        let existing = exist_units(normalized); 
        let padded = pad_units(normalized, existing);

        clock = slice_clock.apply(
            this, 
            Array.prototype.concat(
                [], 
                time_to_clock(padded, pad_zero), 
                existing
            )
        );
    }

    if(!alarm){
        return _.compose(
            (ms)=>generate_date_millis(ms),
            ()=>str_to_milli(clock, false, start),
            ()=>is_clock(clock)
        )();
    }else{
        return _.compose(
            ()=>str_to_milli(clock, true, start),
            ()=>is_clock(clock)
        )();
    }
}
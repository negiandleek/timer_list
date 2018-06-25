import _ from "underscore";

import exist_units from "../lib/existUnits";
import is_clock from "../lib/isClock";
import normalize_units from "../lib/normalizeUnits";
import pad_units from "../lib/padUnits";
import pad_zero from "../lib/padZero";
import time_to_clock from "../lib/timeToClock";

import clock_to_milli from "../lib/clockToMilli";
import generate_dms from "../lib/generateDMs";
import slice_clock from "../lib/sliceClock";

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
            (ms)=>generate_dms(ms),
            ()=>clock_to_milli(clock, false, start),
            ()=>is_clock(clock)
        )();
    }else{
        return _.compose(
            ()=>clock_to_milli(clock, true, start),
            ()=>is_clock(clock)
        )();
    }
}
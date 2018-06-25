import alpha from "./alpha";
import pad_zero from "./padZero";
import milli_to_time from "./convertMilliToTime";
import concatenate_time_to_clock from "./concatenateTimeToClock";
import slice_clock from "./sliceClock";
import to_time from "./convertClockToTime";

const down_base = [99,60,60,1000];
const up_base = [100,100,100,1000];

function calculation(subject, target, base, sign){
    let result = Object.assign({}, subject);

    for(let i = 3; i >= 0; i -= 1){
        let diff = result[alpha.time_units[i]] + sign * target[alpha.time_units[i]];
        if(diff < 0 && i === 0){
            return Object.assign({}, alpha.time_init);
        }
        if(diff < 0 && sign === -1){
            diff = base[i] + diff;
            result[alpha.time_units[(i - 1)]] -= 1;
        }
        if(diff >= base[i] && sign === 1){
            diff = diff - base[i];
            result[alpha.time_units[(i - 1)]] += 1;
        }
        result[alpha.time_units[i]] = diff;
    }

    return result;
}

export default function put_time_base_ten(clock, ms, start=0, end=1){
    // if(!_.isNumber(value) && _.isNaN(Number(value))){
    //     return clock;
    // }

    let sign = Math.sign(ms);
    let a = milli_to_time(Math.abs(ms));
    let b = concatenate_time_to_clock(a, pad_zero);
    let c = slice_clock(b, start, end);
    let base = sign === 1? up_base: down_base;
    
    let origin = to_time(clock, start, end);
    let calc = to_time(c, start, end);

    return calculation(origin, calc, base, sign);
}


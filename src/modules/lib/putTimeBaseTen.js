import _ from "underscore";
import is_time_of_string from "./isTimeOfString";
import pad_zero from "./padZero";

const reg = /[0-9]{0}(?=(?:[0-9]{2})+$)/;
const down_base = [99,60,60,1000];
const up_base = [100,100,100,1000];

export default function put_time_base_ten(clock, value){
    is_time_of_string(clock);

    if(!_.isNumber(value) && _.isNaN(Number(value))){
        return clock;
    }
    if(Number(clock) <= Math.abs(Number(value))){
        return clock;
    }
    
    let value_string = _.isString(value)? value: String(value);
    let value_length = Math.sign(value) === -1? value_string.length - 1: value_string.length;

    if(clock.length < value_length){
        return clock;
    }

    let origin = clock.split(reg).map(Number);
    let origin_digits = Math.ceil(clock.length / 2);
    // normalize
    let sign = 1;
    let remove_sign = value_string.replace("-", ()=>{sign = -1; return ""});
    let next = remove_sign.split(reg).map(Number)
    let padding = new Array(origin.length - next.length).fill().map(()=>0);
    // next array pad array included zero as origin length 
    next = padding.concat(next);
    
    let base = sign === 1? up_base: down_base; 
    for(let i = 0; i < origin_digits; i += 1){
        let index = origin.length - 1;
        let jndex = next.length - 1;
        let diff = origin[index - i] + sign * next[jndex - i];
        if(diff < 0 && sign === -1){
            diff = base[index - i] + diff;
            origin[index - (i + 1)] -= 1;
        }

        if(diff >= base[index - i] && sign === 1){
            diff = diff - base[index - i]; 
            origin[index - (i + 1)] += 1;
        }
        origin[index - i] = diff;
    }
    origin = origin.map((item)=>pad_zero(item,2));

    return origin.join("");
}
import is_time from "./isTime";
import pad_zero from "./padZero";

const reg = /[0-9]{0}(?=(?:[0-9]{2})+$)/;
const down_base = [99,60,60,100];
const up_base = [100,100,100,100];

export default function put_time_base_ten(value, str){
    is_time(value)

    let origin = value.split(reg).map(Number);
    let origin_digits = Math.ceil(value.length / 2);
    // normalize
    let sign = 1;
    let remove_sign = str.replace("-", ()=>{sign = -1; return ""});
    let back = remove_sign.split(reg).map(Number)
    let padding = new Array(origin.length - back.length).fill().map(()=>0);
    // back array pad array included zero as origin length 
    back = padding.concat(back);
    
    let base = sign === 1? up_base: down_base; 

    for(let i = 0; i < origin_digits; i += 1){
        let index = origin.length - 1;
        let jndex = back.length - 1;
        let diff = origin[index - i] + sign * back[jndex - i];
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
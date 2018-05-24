import is_time from "./isTime";

export default function shift_time_to_input(prev, next){
    let r;
    let diff = String(next).length - String(prev).length;
    if(diff >= 0){
        r = next.slice(diff);
    }else{
        let zero = new Array(-1 * (diff - 1)).join("0");
        r = zero + next;
    }
    return r;
}
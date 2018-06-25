import alpha from "./alpha";

export default function convert_clock_to_time(value, start = 0, end = 1){
    let time = Object.assign({}, alpha.time_init);
    let index = 0;

    if(typeof value === "number"){
        value = String(value);
    }

    for(let i = start; i <= end; i += 1){
        let str = value.substr(index*2, alpha.time_digits[i]);
        index += 1;
        time[alpha.time_units[i]] = parseInt(str, 10) || 0;
    };

    return time;
}
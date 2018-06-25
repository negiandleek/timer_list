import alpha from "./alpha";

export default function calculation(subject, target, sign){
    let result = Object.assign({}, subject);
    let base = sign !== -1? [100,100,100,1000]: [99,60,60,1000];

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
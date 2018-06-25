import alpha from "../lib/alpha";

const h = alpha.time_based[0];
const m = alpha.time_based[1];
const s = alpha.time_based[2];

export default function milli_to_time(ms){
    let result = parseInt(ms,10);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let millis = 0;

    hours = Math.floor(result / h);
    result = result - (hours * h);

    minutes = Math.floor(result / m);
    result = result - (minutes * m);

    seconds = Math.floor(result / s);
    result = result - (seconds * s);

    millis = result;

    return {
        hours,
        minutes,
        seconds,
        millis
    };
}
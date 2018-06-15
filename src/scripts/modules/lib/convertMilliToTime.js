import pad_zero from "./padZero";
const h = 60 * 60 * 1000;
const m = 60 * 1000;
const s = 1000

export default function convert_milli_to_time(value){
    let result = Number(value);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    hours = Math.floor(result / h);
    result = result - (hours * h);

    minutes = Math.floor(result / m);
    result = result - (minutes * m);

    seconds = Math.floor(result / s);
    result = result - (seconds * s);

    return {
        hours,
        minutes,
        seconds
    };
}
const h = 60 * 60 * 100;
const m = 60 * 100;
const s = 100

export default function convert_milli_to_time(value){
    let result = value;
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
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}
import is_time from "./isTime";

const reg = /[0-9]{0}(?=(?:[0-9]{2})+$)/;
const order = ["hours", "minutes", "seconds", "millis"];

// FIX:00:00:00 end up "tomorrow"
export default function is_tomorrow(value){
    is_time(value);

    let now = {};
    now.date = new Date();
    now.hours = now.date.getHours();
    now.minutes = now.date.getMinutes();
    now.seconds = now.date.getSeconds();
    now.millis = now.date.getMilliseconds();
    let feature_date = value.split(reg).map(Number);
    let is_tomorrow = true;
    for(let i = 0; i < feature_date.length; i += 1){
        if(now[order[i]] < feature_date[i]){
            is_tomorrow = false;
            break;
        }
    }
    return is_tomorrow;
}
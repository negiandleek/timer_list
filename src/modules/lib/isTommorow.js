import is_time from "./isTime";

const reg = /[0-9]{0}(?=(?:[0-9]{2})+$)/;
const order = ["hours", "minutes", "seconds", "millis"];

export default function is_tomorrow(value){
    is_time(value);

    let now = {};
    now.date = new Date();
    now.hours = now.date.getHours();
    now.minutes = now.date.getMinutes();
    now.seconds = now.date.getSeconds();
    now.millis = now.date.getMilliseconds();
    let target_date = value.split(reg).map(Number);
    let is_tomorrow = false;
    for(let i = 0; i < target_date.length; i += 1){
        console.log(now[order[i]], target_date[i])
        if(now[order[i]] > target_date[i]){
            is_tomorrow = true;
            break;
        }
    }
    return is_tomorrow;
}
import is_time_of_string from "./isTimeOfString";

const reg = /[0-9]{0}(?=(?:[0-9]{2})+$)/;
const order = ["hours", "minutes", "seconds", "millis"];

export default function is_past(date){
    let past_flag = false;
    let now = new Date();
    return date.getTime() <= now.getTime();
}
import is_clock from "../lib/isClock";

const reg = /:/g;

export default function undisplay(value){
    return value.replace(reg, "");
}
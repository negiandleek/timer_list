const reg = /:/g;

export default function undisplay(clock){
    return clock.replace(reg, "");
}
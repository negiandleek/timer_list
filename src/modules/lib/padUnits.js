import alpha from "./alpha";

export default function pad_units(units){
    let ary = units.slice();
    let len = ary.length - 1;
    let start = alpha.time_units.indexOf(ary[0]);
    let end = alpha.time_units.indexOf(ary[len]) + 1;
    return alpha.time_units.slice(start, end);
}
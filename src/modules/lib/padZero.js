import _ from "underscore";

export default function pad_zero(value, range = 2){
    if(_.isObject(value)){
        for(let key in value){
            let m = String(value[key])
            let str = new Array(range + 1).join("0");
            value[key] = (str + m).slice(-1 * range);
        }
        return value;
    }else{
        return (pad_zero({temp: value}, range)).temp;
    }
}
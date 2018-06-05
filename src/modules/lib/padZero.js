import _ from "underscore";

export default function pad_zero(value, range = 2){
    if(_.isObject(value)){
        let obj = Object.assign({},value);
        for(let key in obj){
            let m = String(obj[key])
            let str = new Array(range + 1).join("0");
            obj[key] = (str + m).slice(-1 * range);
        }
        return obj;
    }else{
        return (pad_zero({temp: value}, range)).temp;
    }
}
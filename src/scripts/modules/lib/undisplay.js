import _ from "underscore";

const reg = /:/g;

export default function undisplay(value){
    if(!_.isString(value)){
        throw new TypeError("value must be String Type");
    }
    return value.replace(reg, "");
}
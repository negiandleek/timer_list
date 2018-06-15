import _ from "underscore";

export default function display(value, digits=2){
    if(!_.isString(value)){
        throw new TypeError("value must be String Type");
    }
    const reg = new RegExp("([0-9]{" + digits + "})(?=[0-9]{" + digits + "})","g");
    return value.replace(reg,(match)=> match + ":");
}
import _ from "underscore";

export default function display(clock, digits=2){
    if(!_.isString(clock)){
        throw new TypeError("argument must be String Type");
    }
    const reg = new RegExp("([0-9]{" + digits + "})(?=[0-9]{" + digits + "})","g");
    return clock.replace(reg,(match)=> match + ":");
}
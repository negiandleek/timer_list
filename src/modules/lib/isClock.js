import _ from "underscore";

const reg = /[^0-9]/g;

export default function is_clock(clock){
    if(clock == null || typeof clock === "undefined"){
        throw new Error("argument is null or not defined");
    }
    if(!_.isString(clock)){
        throw new TypeError("argument must be string type");
    }
    if([2,4,6].filter((i)=> i === clock.length).length === 0){
        throw new Error("argument length must be 2 or 4 or 6");
    }
    if(reg.test(clock)){
        throw new TypeError("argument must be Number of String type")
    }
    return true;
}
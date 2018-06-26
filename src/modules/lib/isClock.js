import _ from "underscore";

const reg = /[^0-9]/g;

export default function is_clock(clock){
    if(clock == null || clock == ""){
        throw new Error("argument is null or undefined");
    }
    if(!_.isString(clock)){
        throw new TypeError("argument must be string type");
    }
    if([2,4,6,10].filter((i)=> i === clock.length).length === 0){
        throw new Error("argument length must be 2 or 4 or 6");
    }
    if(reg.test(clock)){
        throw new TypeError("argument must be num of String type")
    }
    return true;
}
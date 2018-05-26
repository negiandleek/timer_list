import _ from "underscore";

const reg = /[^0-9]/g;

// TODO:is_timeは引数をすべて調べる
export default function is_time(value){
    if(value == null || typeof value === "undefined"){
        throw new Error("value is null or not defined");
    }
    if(!_.isString(value)){
        throw new TypeError("value must be string type");
    }
    if([2,4,6].filter((i)=> i === value.length).length === 0){
        throw new Error("value length must be 2 or 4 or 6");
    }
    if(reg.test(value)){
        throw new Error("value must be Number of String type")
    }
    return true;
}
export default function is_numeric(value){
    if(!_.isNumber(value) && _.isNaN(Number(value))){
        throw new TypeError("arg must be Number or String convertible Number.");
    }
    return value;
}
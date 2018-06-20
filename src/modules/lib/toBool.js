export default function to_bool(value){
    if(typeof value === "boolean"){
        return value;
    }else if(typeof value === "string"){
        return value === "true"? true: false
    }
}
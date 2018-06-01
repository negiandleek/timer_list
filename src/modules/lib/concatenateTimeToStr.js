import alpha from "./alpha";

export default function concatenate_time_to_str(obj){
    let str = String();
    // let keys = Object.keys(obj).map((key)=>key);
    alpha.time_order.forEach(key=>{
        str += String(obj[key])
    })
    return str
}
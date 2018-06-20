import alpha from "./alpha";

export default function is_time_of_object(time){
    let keys = Object.key(time);
    alpha.time_order.forEach((item)=>{
        if(keys.indexOf(item) === -1){
            throw new Error("ある")
        }
    });
    keys.forEach((key)=>{
        if(alpha.time_order.indexOf(key) === -1){
            throw new Error("ない");
        }
    });

    return true;
}
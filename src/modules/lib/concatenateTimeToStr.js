const based = ["hours","minutes","seconds"];
// TODO -> hours,minutest...の順番で行う

export default function concatenate_time_to_str(obj){
    let str = String();
    let keys = Object.keys(obj).map((key)=>key);
    keys.forEach((key)=>{
        if(based.indexOf(key) === -1){
            throw new Error()
        }
    });
    based.forEach((key) => {
      str += String(obj[key]);
    })
    return str
}
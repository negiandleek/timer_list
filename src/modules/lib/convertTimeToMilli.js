const based = {
    "hours": 60 * 60 * 100,
    "minutes": 60 * 100,
    "seconds": 100,
};
const based_keys = Object.keys(based).map((key)=>key);

export default function convert_time_to_milli(obj){
    let r = 0;
    let keys = Object.keys(obj).map((key)=>key);
    keys.forEach((key)=>{
        if(based_keys.indexOf(key) === -1){
            throw new TypeError("Object Key must be 'hours' or 'minutes' or 'seconds'");
        }
        r += Number(obj[key]) * based[key];
    })
    return r;
}
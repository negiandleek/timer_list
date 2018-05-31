export default function slice_time_of_string(str, length, alarm=true){
    if(alarm){
        return str.slice(0, length);
    }else{
        return str.slice(-1 * length);
    }
};
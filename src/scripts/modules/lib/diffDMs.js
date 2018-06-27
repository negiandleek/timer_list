import _ from "underscore";
export default function diff_dms(dms){
    if(typeof dms === "string"){
        dms = parseInt(dms, 10);
    }
    return dms - _.now();
}
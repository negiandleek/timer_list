import _ from "underscore";
export default function diff_dms(dms){
    return dms - _.now();
}
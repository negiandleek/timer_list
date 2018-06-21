import _ from "underscore";
export default function get_diff_date_millis(dms){
    return dms - _.now();
}
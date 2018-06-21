import _ from "underscore";
export default function get_diff_date_millis(date){
    return date.getTime() - _.now();
}
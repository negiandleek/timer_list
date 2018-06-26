import is_numeric from "../lib/isNumeric";
import diff_dms from "../lib/diffDMs";

export default function compose_diff_dms(ms){
    is_numeric(ms);
    return diff_dms(ms);
}
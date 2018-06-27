import is_numeric from "../lib/isNumeric";
import diff_dms from "../lib/diffDMs";

export default function compose_diff_dms(dms){
    is_numeric(dms);
    return diff_dms(dms);
}
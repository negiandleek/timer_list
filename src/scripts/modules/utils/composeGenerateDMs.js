import is_numeric from "../lib/isNumeric";
import generate_dms from "../lib/generateDMs";

export default function compose_generate_dms(ms){
    is_numeric(ms);
    return generate_dms(ms);
}
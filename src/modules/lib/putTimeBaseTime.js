import _ from "underscore";
import concatenate_time_to_clock from "./concatenateTimeToClock";
import convert_time_to_milli from "./convertTimeToMilli";
import convert_str_to_milli from "./convertStrToMilli";
import convert_milli_to_time from "./convertMilliToTime";
import slice_clock from "./sliceClock";
import pad_zero from "./padZero";

export default function put_time_base_time(clock, value = "1000", start=0, end=1){

    let converted_milli = convert_str_to_milli(clock,false,start);
    let converted_time = convert_milli_to_time(converted_milli);
    let millis = convert_time_to_milli(converted_time);
    let time = convert_milli_to_time(parseInt(millis,10) + parseInt(value,10));

    let forward_date = _.mapObject(time, (value)=> pad_zero(value, 2));
    let concatenation_time = concatenate_time_to_clock(forward_date);

    if(concatenation_time < 0){
        return concatenation_time;
    }

    let converted_milli_ = convert_str_to_milli(concatenation_time);
    let converted_time_ = convert_milli_to_time(converted_milli_);
    let date = _.mapObject(converted_time_, (value, key)=> pad_zero(value, 2));
    let result = concatenate_time_to_clock(date)
    return slice_clock(result, start, end);
}

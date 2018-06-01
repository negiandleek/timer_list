import ticktack from "../modules"

export function get_count(date, isAlarm){
    let time = get_remaining_time(date, isAlarm);
    let time_of_string = get_time_of_string(time, isAlarm);
    return time_of_string;
}

export function get_time_of_string(time, isAlarm){
    let concatenated = ticktack.concatenate_time_to_str(time);
    return ticktack.slice_time_of_string(concatenated, 4 + (isAlarm? 2: 0), isAlarm);
};

export function get_remaining_time(date, isAlarm){
    let time = ticktack.convert_milli_to_time(date);
    return ticktack.pad_zero(time, 2);
};

export function get_diff_date_and_now(target){
    return target.getTime() - new Date().getTime();
};
import * as utils from "../utils";
import ticktack from "../modules";
import _ from "underscore";

const initial_state = [];

function bubble_sort(ary, key, count){
    let i = 0;
    for(; i < ary.length; i+=1){
        if(ary[i][key] >= count){
            break;
        };
    }
    return i;
}

const timers = (state = initial_state, action) => {
    let new_state;
    let payload;
    switch(action.type){
        case "ADD_TIMER":
            new_state = state.slice();
            payload = action.payload;
            const data = {
                id: Math.random().toString(36).substr(2, 9),
                count: payload.count,
                date: payload.date,
                alarm_flag: payload.alarm_flag,
                stoped_flag: false,
                active_flag: true,
                memo: "",
            };
            const i = bubble_sort(new_state, "count", data.count);
            new_state.splice(i, 0, data);
            return new_state;

        case "DELETE_TIMER":
            payload = action.payload;
            new_state = state.slice();
            new_state = new_state.filter(items => {
                return items.id !== payload.id
            })

            return new_state;

        case "UPDATE_TIMER":
            payload = action.payload;
            new_state = state.slice();
            //TODO
            new_state = _.sortBy(new_state, (obj)=> parseInt(obj.count, 10));
            new_state = new_state.map(items => {
                if(items.stoped_flag)return items;
                const date = (items.date instanceof Date)? items.date: new Date(items.date);
                const diff = utils.get_diff_date_and_now(date);
                if(diff <= 0){
                    items.count = "0".repeat(4 + (items.alarm_flag * 2));
                    items.active_flag = false;
                }else{
                    items.count = utils.get_count(diff, items.alarm_flag);
                    items.date = date;
                }
                return items;
            });

            return new_state;

        case "RESUME_TIMER":
            payload = action.payload;

            new_state = state.slice();
            new_state = new_state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.stoped_flag = false;
                items.date = ticktack.generate_in_date_time(items.count, false);
                return items;
            });

        return new_state;

        case "STOP_TIMER":
            payload = action.payload;

            new_state = state.slice();
            new_state = new_state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.stoped_flag = true;
                return items;
            });

            return new_state;

        case "UPDATE_MEMO":
            payload = action.payload;
            new_state = state.slice();
            new_state = new_state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.memo = payload.value;
                return items;
            });
            return new_state;

        case "SET_INTERVAL":
            payload = action.payload;
            
            new_state = state.slice();
            new_state = new_state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.interval_id = payload.interval_id;
                return items;
            });
            
            return new_state;

        case "SET_LOCAL_STORAGE":
            localStorage.setItem("timers", JSON.stringify(state))
            return state;

        default:
            return state;
    }
}

export default timers;
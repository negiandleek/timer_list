import * as utils from "../utils";
import ticktack from "../modules";
import _ from "underscore";

const initial_state = [[],[],[]];

function find_index_of_child_id(state, parent_id, child_id){
    let index = -1;
    for(let i = 0; i < state[parent_id].length; i += 1){
        if(state[parent_id][i].child_id === child_id){
            index = i;
        }
    }
    return index;
}

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
    let index;
    switch(action.type){
        case "ADD_TIMER":
            new_state = state.slice();
            payload = action.payload; 
            const data = {
                parent_id: payload.parent_id,
                count: payload.count,
                date: payload.date,
                type: payload.type,
                memo: "",
                interval_id: 0, //delete
                active: true,
                child_id: Math.random().toString(36).substr(2, 9),
                stoped_flag: false //active
            };
            const i = bubble_sort(new_state[0], "count", data.count);
            new_state[0].splice(i, 0, data);
            return new_state;

        case "DELETE_TIMER":
            payload = action.payload;
            new_state = state.slice();
            new_state[payload.parent_id] = new_state[payload.parent_id].filter(items => {
                return items.child_id !== payload.child_id
            })

            return new_state;

        case "UPDATE_TIMER":
            payload = action.payload;
            new_state = state.slice();
            new_state[0] = _.sortBy(new_state[0], (obj)=> parseInt(obj.count, 10));
            new_state[0] = new_state[0].map(items => {
                if(items.stoped_flag)return items;
                const date = (items.date instanceof Date)? items.date: new Date(items.date);
                const diff = utils.get_diff_date_and_now(date);
                if(diff <= 0){
                    items.count = "0".repeat(4 + (items.type * 2));
                    items.active = false;
                }else{
                    items.count = utils.get_count(diff, items.type);;
                    items.date = date;
                }
                return items;
            });

            return new_state;

        case "RESUME_TIMER":
            payload = action.payload;

            new_state = state.slice();
            new_state[0] = new_state[0].map(items => {
                if(items.child_id !== payload.child_id){
                    return items
                }
                items.stoped_flag = false;
                items.date = ticktack.generate_in_date_time(items.count, items.type);;
                return items;
            });

        return new_state;

        case "STOP_TIMER":
            payload = action.payload;

            new_state = state.slice();
            new_state[0] = new_state[0].map(items => {
                if(items.child_id !== payload.child_id){
                    return items
                }
                items.stoped_flag = true;
                items.date = payload.date? payload.date: items.date;
                return items;
            });

            return new_state;

        case "UPDATE_MEMO":
            payload = action.payload;
            new_state = state.slice();
            new_state[payload.parent_id] = new_state[payload.parent_id].map(items => {
                if(items.child_id !== payload.child_id){
                    return items
                }
                items.memo = payload.value;
                return items;
            });
            return new_state;

        case "SET_INTERVAL":
            payload = action.payload;
            
            new_state = state.slice();
            new_state[payload.parent_id] = new_state[payload.parent_id].map(items => {
                if(items.child_id !== payload.child_id){
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
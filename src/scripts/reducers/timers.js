import _ from "underscore";
import whiterabbit from "white-rabbit-watch";

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
    switch(action.type){
        case "ADD_TIMER":{
            let new_state = state.slice();
            const payload = action.payload;
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
        }
        case "DELETE_TIMER":{
            const payload = action.payload;

            return state.filter(items => {
                return items.id !== payload.id
            });
        }

        case "UPDATE_TIMER":{
            let new_state = _.sortBy(state, (obj)=> parseInt(obj.count, 10));

            return new_state.map(items => {
                if(items.stoped_flag)return items;
                
                const diff = whiterabbit.diff_dms(items.date);

                if(diff <= 0){
                    items.count = "0".repeat(4 + (items.alarm_flag * 2));
                    items.active_flag = false;
                }else{
                    items.count = whiterabbit.get_count(items.date, 0, 2);
                }

                return items;
            });
        }
        case "RESUME_TIMER":{
            const payload = action.payload;

            return state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                let ms = whiterabbit.clock_to_milli(items.count);
                items.stoped_flag = false;
                items.date = whiterabbit.generate_dms(ms, false);
                return items;
            });
        }
        case "STOP_TIMER":{
            const payload = action.payload;

            return state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.stoped_flag = true;
                return items;
            });
        }
        case "UPDATE_MEMO":{
            const payload = action.payload;
            return state.map(items => {
                if(items.id !== payload.id){
                    return items
                }
                items.memo = payload.value;
                return items;
            });
        }
        case "SET_LOCAL_STORAGE":{
            localStorage.setItem("timers", JSON.stringify(state))
            return state;
        }
        default:
            return state;
    }
}

export default timers;
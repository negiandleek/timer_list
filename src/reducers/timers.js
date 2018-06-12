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

const timers = (state = initial_state, action) => {
    let new_state;
    let payload;
    let index;

    switch(action.type){
        case "ADD_TIMER":
            new_state = state.slice();
            payload = action.payload; 
            var data = {
                parent_id: payload.parent_id,
                count: payload.count,
                date: payload.date,
                type: payload.type,
                memo: "",
                interval_id: 0,
                child_id: Math.random().toString(36).substr(2, 9),
                stoped_flag: false
            };
            new_state[payload.parent_id].push(data);
            
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
            new_state[payload.parent_id] = new_state[payload.parent_id].map(items => {
                if(items.child_id !== payload.child_id){
                    return items
                }
                items.count = payload.count;
                items.date = payload.date? payload.date: items.date;
                return items;
            })

            return new_state;

        case "TOGGLE_TIMER":
            payload = action.payload;

            new_state = state.slice();
            new_state[payload.parent_id] = new_state[payload.parent_id].map(items => {
                if(items.child_id !== payload.child_id){
                    return items
                }
                items.stoped_flag = !items.stoped_flag;
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
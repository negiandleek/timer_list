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
            payload.interval_id = 0;
            payload.child_id = Math.random().toString(36).substr(2, 9);
            payload.stoped_flag = 0;
            new_state[payload.parent_id].push(action.payload);
            return new_state;

        case "DELETE_TIMER":
            payload = action.payload;
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            new_state = state.slice();
            new_state[payload.parent_id].splice(index, 1);
            return new_state;

        case "UPDATE_TIMER":
            payload = action.payload;
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            
            new_state = state.slice();
            new_state[payload.parent_id][index].count = payload.count;
            new_state[payload.parent_id][index].date = payload.date;

            return new_state;

        case "STOP_TIMER":
            payload = action.payload;
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            new_state = state.slice();
            new_state[payload.parent_id][index].stoped_flag = true;            
            return new_state;

        case "RESUME_TIMER":
            payload = action.payload;
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            new_state = state.slice();
            new_state[payload.parent_id][index].stoped_flag = false;    
            return new_state;

        case "SET_INTERVAL":
            payload = action.payload;
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            new_state = state.slice();
            new_state[payload.parent_id][index].interval_id = payload.interval_id;
            
            return new_state;

        case "SET_LOCAL_STORAGE":
            localStorage.setItem("timers", JSON.stringify(state))
            return state;

        default:
            return state;
    }
}

export default timers;
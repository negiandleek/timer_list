const initial_state = [[],[],[]];
let child_id = 0;
let new_state;
let payload;
let index = -1;
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
    switch(action.type){
        case "ADD_TIMER":
            new_state =  state.slice();
            payload = action.payload;
            payload.setInterval = "";
            payload.child_id = child_id++;
            new_state[payload.parent_id].push(action.payload);
            return new_state;

        case "DELETE_TIMER":
            clearInterval(state[parent_id][index].interval_id);
            new_state = this.state.slice();
            return new_state[parent_id].splice(index, 1);

        case "UPDATE_TIMER":
            payload = action.payload;   
            index = find_index_of_child_id(state, payload.parent_id, payload.child_id);
            
            new_state = state.slice();
            new_state[payload.parent_id][index].count = payload.count;

            return new_state;
        default:
            return state;
    }
}

export default timers;
const initial_state = [[],[],[]];
let child_id = 0;
let new_state;
let payload;
const timers = (state = initial_state, action) => {
    switch(action.type){
        case "ADD_TIMER":
            new_state =  Object.assign({}, state);
            payload = action.payload;
            payload.setInterval = "";
            payload.child_id = child_id++;
            new_state[payload.parent_id].push(action.payload);
            return new_state;

        case "DELETE_TIMER":
            clearInterval(state[parent_id][index].interval_id);
            new_state = this.state.slice();
            return new_state[parent_id].splice(index, 1);

        default:
            return state;
    }
}

export default timers;
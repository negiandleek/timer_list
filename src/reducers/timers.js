const timers = (state = {}, action) => {
    switch(action.type){
        case "ADD_TIMER":
            
            let new_state =  Object.assign({}, state);
            let payload = action.payload;
            new_state[payload.parent_id].push({
                parent_id: payload.parent_id,
                child_id: payload.child_id,
                count: payload.count,
                interval_id: payload.interval_id
            });
            
            return new_state;

        default:
            return state;
    }
}
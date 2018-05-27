const initial_state = {
    count: "0000",
    type: 0
}
const form = (state = initial_state, action) => {
    switch(action.type){
        case "CHANGE_INPUT":
            let new_state = Object.assign({}, state);
            new_state.count = action.payload.count;
            return new_state;
            
        case "INIT_TIME":
            return {
                count: "0000",
                type: 0
            }
        default:
            return state;
    }
}

export default form;
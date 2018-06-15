export const add_timer = (parentId, count, date, type) => ({
    type: "ADD_TIMER",
    payload: {
        parent_id: parentId,
        count,
        date,
        type
    }
});

export const delete_timer = (parentId, childId, intervalId) => ({
    type: "DELETE_TIMER",
    payload: {
        parent_id: parentId,
        child_id: childId,
        interval_id: intervalId
    }
});

export const update_timer = () => ({
    type: "UPDATE_TIMER"
});

export const stop_timer = (child_id) => ({
    type: "STOP_TIMER",
    payload: {
        child_id
    }
});

export const resume_timer = (child_id) => {
    return {
        type: "RESUME_TIMER",
        payload: {
            child_id
        }
    }
};

export const update_memo = (parent_id, child_id, value) => ({
    type: "UPDATE_MEMO",
    payload: {
        parent_id,
        child_id,
        value
    }
});

let interval_id = 0;
export const set_interval_global = (dispatch)=>{
    if(!interval_id){
        interval_id = setInterval(()=>dispatch(update_timer()), 1000);
        dispatch({type: "SET_INTERVAL_GLOBAL"})
    }
};

export const clear_interval_global = (dispatch)=>{
    interval_id = 0;
    clearInterval(interval_id);
    dispatch({type: "CLEAR_INTERVAL_GLOBAL"});
}

export const TimerActions = {
    ADD_TIMER: "ADD_TIMER",
    DELETE_TIMER: "DELETE_TIMER",
    UPDATE_TIMER: "UPDATE_TIMER"
}
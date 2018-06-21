export const add_timer = (count, date, alarm_flag) => ({
    type: "ADD_TIMER",
    payload: {
        count,
        date,
        alarm_flag
    }
});

export const delete_timer = (id, intervalId) => ({
    type: "DELETE_TIMER",
    payload: {
        id,
        interval_id: intervalId
    }
});

export const update_timer = () => ({
    type: "UPDATE_TIMER"
});

export const stop_timer = (id) => ({
    type: "STOP_TIMER",
    payload: {
        id
    }
});

export const resume_timer = (id) => {
    return {
        type: "RESUME_TIMER",
        payload: {
            id
        }
    }
};

export const update_memo = (id, value) => ({
    type: "UPDATE_MEMO",
    payload: {
        id,
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
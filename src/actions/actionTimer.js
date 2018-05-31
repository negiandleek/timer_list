export const add_timer = (payload) => ({
    type: "ADD_TIMER",
    payload: payload
});

// export const clear_timer = (parentId, childId, intervalId) =>({
//     type: "CLEAR_TIMER",
//     payload: {
//         parent_id: parentId,
//         child_id: childId,
//         interval_id: intervalId
//     }
// });

export const delete_timer = (parentId, childId, intervalId) => ({
    type: "DELETE_TIMER",
    payload: {
        parent_id: parentId,
        child_id: childId,
        interval_id: intervalId
    }
});

export const update_timer = (parentId, childId, count) => ({
    type: "UPDATE_TIMER",
    payload: {
        parent_id: parentId,
        child_id: childId,
        count
    }
});

export const TimerActions = {
    ADD_TIMER: "ADD_TIMER",
    DELETE_TIMER: "DELETE_TIMER",
    UPDATE_TIMER: "UPDATE_TIMER"
}
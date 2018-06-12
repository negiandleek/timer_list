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

export const update_timer = (parentId, childId, count, date) => ({
    type: "UPDATE_TIMER",
    payload: {
        parent_id: parentId,
        child_id: childId,
        count,
        date
    }
});

export const toggle_timer = (parent_id, child_id) => ({
    type: "TOGGLE_TIMER",
    payload: {
        parent_id,
        child_id
    }
});

export const update_memo = (parent_id, child_id, value) => ({
    type: "UPDATE_MEMO",
    payload: {
        parent_id,
        child_id,
        value
    }
});

export const TimerActions = {
    ADD_TIMER: "ADD_TIMER",
    DELETE_TIMER: "DELETE_TIMER",
    UPDATE_TIMER: "UPDATE_TIMER"
}
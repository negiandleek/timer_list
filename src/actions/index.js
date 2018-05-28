let child_id = 0;

export const add_timer = (payload) => ({
    type: "ADD_TIMER",
    payload: payload
});

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

export const set_interval = (parentId, childId, intervalId) => ({
    type: "SET_INTERVAL",
    payload: {
        parent_id: parentId,
        child_id: childId,
        interval_id: intervalId
    }
})

export const change_input = (count) => ({
    type: "CHANGE_INPUT",
    payload: {
        count: count
    }
});

export const init_input = () => ({
    type: "INIT_INPUT",
    payload: {
        count: "0000",
        type: 0
    }
})

export const TodoActions = {
    ADD_TIMER: "ADD_TIMER",
    UPDATE_TIMER: "UPDATE_TIMER",
    CHANGE_INPUT: "CHANGE_INPUT",
    INIT_INPUT: "INIT_INPUT"
};
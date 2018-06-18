export const change_input = (count) => ({
    type: "CHANGE_INPUT",
    payload: {
        count: count
    }
});

export const init_input = () => ({
    type: "INIT_INPUT",
    payload: {
        count: "0000"
    }
})

export const set_interval = (id, intervalId) => ({
    type: "SET_INTERVAL",
    payload: {
        id,
        interval_id: intervalId
    }
})

export const FormActions = {
    CHANGE_INPUT: "CHANGE_INPUT",
    INIT_INPUT: "INIT_INPUT",
    SET_INTERVAL: "SET_INTERVAL"
};
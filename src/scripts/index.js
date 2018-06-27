import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";
import App from "./components/App";

const persisted_state = localStorage.getItem("timers") ? JSON.parse(localStorage.getItem("timers")) : [];
const store = createStore(reducer, {timers: persisted_state});
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)

window.addEventListener("beforeunload", ()=>{
    store.dispatch({type: "SET_LOCAL_STORAGE"});
});
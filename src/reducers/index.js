import React from "react";
import ReactDOM from "react-dom";
import {combineReducers} from "redux";
import {Provider} from "react-redux";

import timers from "./timers";
import form from "./form";

export default combineReducers({
    timers,
    form
});
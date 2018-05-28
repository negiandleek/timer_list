import React from "react";
import ReactDOM from "react-dom";
import {combineReducers} from "redux";
import {Provider} from "react-redux";

import form from "./form";
import timers from "./timers";

export default combineReducers({
    form,
    timers
});
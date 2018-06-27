import {combineReducers} from "redux";

import form from "./form";
import timers from "./timers";

export default combineReducers({
    form,
    timers
});
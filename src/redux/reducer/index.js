import { combineReducers } from 'redux'
import loggedReducer from './logged'
import counterReducer from './counter'

const reducers = combineReducers({
    logged: loggedReducer,
    counter: counterReducer
});

export default reducers;
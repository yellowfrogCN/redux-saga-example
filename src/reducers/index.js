import { combineReducers } from 'redux';
// 首页的reducer
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    homeReducer
});

export default rootReducer;
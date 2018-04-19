import createReducer from '../createReducer';
import * as fn from './homeReducerFn';

const initState = {
    avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '个人描述',
    name: '姓名',
    loading: false
};
const handle = {
    GET_DATA_SUCCESS: fn.testSuccess,
    GET_DATA_LOADING: fn.changeLoading
};


const homeReducer = createReducer(initState, handle);

export default homeReducer;
import { actionCreator } from 'yf-helper';
import * as types from './actionTypes';

export const requestDataAction = actionCreator(types.GET_DATA, '异步请求github数据');
export const cancelRequestAction = actionCreator(types.CANCEL_REQUEST, '取消github异步请求');

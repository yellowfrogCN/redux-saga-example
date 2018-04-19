import { delay } from 'redux-saga';
import {
    takeLatest, // 短时间内（没有执行完函数）多次触发的情况下，指会触发相应的函数一次
    put, // 作用跟 dispatch 一毛一样，可以就理解为dispatch
    take, // 获取
    call,
    fork,
    cancel,
    race,
    cancelled
} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import * as actions from '../actions/homeAction';
import fetch from '../utils/fetch';

// 实际业务中，惨品提出来的 网络请求 最大延迟 单位：ms
const maxAllowDelay = 5000;
// 模拟网络延迟的时间 单位:ms
const mockNetworkDelay = 3000;

export default function* rootSaga () {
    yield takeLatest('TEST_REQUEST', testSaga);
}
// 在 testSaga 函数面前加入一个用于控制 testSaga 函数：controlTest
function* controlTestSaga(action) {
    const task = yield fork(testSaga, action);

    yield take(types.TEST_CANCEL_SAGA);
    // yield race([
    //     call(delay, maxAllowDelay),
    //     // 实际业务需求
    //     take(types.TEST_CANCEL_SAGA)
    // ])

    yield cancel(task);
}
// 针对于 types.TEST 这个action所进行的 异步操作函数
function* testSaga(action) {
    try {
        const userName = action.payload;
        // 1、也可以这么写： const result = yield fetch('http://127.0.0.1:3001', params);
        // 2、这边用 call 是为了方便以后需要的 saga 测试
        // https://api.github.com/users/userName 是github的个人信息
        const url = `https://api.github.com/users/${userName}`;
        const api = (params) => fetch(url, params);
        // 为了测试 网络延迟 加入这个 redux-saga 自带的延迟函数，模拟延迟
        // yield call(delay, mockNetworkDelay);
        const result = yield call(api);
        // 成功后：即将在 reducer 里做你想做的事情
        yield put(actions.getDanDataAction(result, 'SUCCESS'));
    }catch (e) {
        // 失败后：即将在 reducer 里做你想做的事情
        yield put(actions.getDanDataAction(e, 'ERROR'));
    }finally{
        // 如果是取消的，则return true；否则 return false
        const bol = yield cancelled();
        // console.log(bol);
        if (bol) {
            console.log('finally-cancelled');
        } else {
            console.log('finally-nature');
        }
    }
}

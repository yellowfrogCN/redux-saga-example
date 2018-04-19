import {
    takeLatest, // 短时间内（没有执行完函数）多次触发的情况下，指会触发相应的函数一次
    // takeEvery, // takeLatest 的同胞兄弟，不同点是每次都会触发相应的函数
    put, // 作用跟 dispatch 一毛一样，可以就理解为dispatch
    call // fork 的同胞兄弟，不过fork是非阻塞，call是阻塞，阻塞的意思就是到这块就停下来了
} from 'redux-saga/effects';
import * as actions from '../actions/homeAction';
import fetch from '../utils/fetch';

export default function* rootSaga () {
    yield takeLatest('GET_DATA_REQUEST', getDataSaga);
}

function* getDataSaga(action) {
    try {
        yield put(actions.requestDataAction(true, 'LOADING')); // 开启loading
        const userName = action.payload;
        // 1、也可以这么写： const result = yield fetch(url地址, params);
        // 2、这边用 call 是为了以后需要的 saga 测试
        // https://api.github.com/users/userName 是github的个人信息
        const url = `https://api.github.com/users/${userName}`;
        const api = (params) => fetch(url, params);
        const result = yield call(api);
        if (result) {
            // 成功后：即将在 reducer 里做你想做的事情
            yield put(actions.requestDataAction(result, 'SUCCESS'));
        }
    } catch (e) {
        // 失败后：即将在 reducer 里做你想做的事情
        yield put(actions.requestDataAction(e, 'ERROR'));
    } finally {
        // 不管成功还是失败还是取消等，都会经过这里
        yield put(actions.requestDataAction(false, 'LOADING')); // 关闭loading
        yield put(actions.requestDataAction(null, 'FINISH')); // 打印一个结束的action，一般没什么用
    }
}
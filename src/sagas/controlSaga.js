// controlSaga.js
import { take, fork, race, call, cancel, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// 普通函数，故不需要加 *
function controlSaga (fn) {
    // 返回一个 Generator函数
    /**
     * @param timeOut: 超时时间, 单位 ms, 默认 5000ms
     * @param cancelType: 取消任务的action.type
     * @param showInfo: 打印信息 默认不打印
     */
    return function* (...args) {
        // 这边思考了一下，还是单单传action过去吧，不想传args这个数组过去, 感觉没什么意义
        const task = yield fork(fn, args[args.length - 1]);
        const timeOut = args[0].timeOut || 5000; // 默认5秒
        // 如果真的使用这个controlSaga函数的话，一般都会传取消的type过来, 假如真的不传的话，配合Match.random()也能避免误伤
        const cancelType = args[0].cancelType || `NOT_CANCEL${Math.random()}`;
        const showInfo = args[0].showInfo; // 没什么用，打印信息而已
        const result = yield race({
            timeOut: call(delay, timeOut),
            // 实际业务需求
            handleToCancel: take(cancelType)
        });
        if (showInfo) {
            if (result.timeOut) yield put({type: `超过规定时间${timeOut}ms后自动取消`})
            if (result.handleToCancel) yield put({type: `手动取消，action.type为${cancelType}`})
        }
    
        yield cancel(task);
    }
}

export default controlSaga;

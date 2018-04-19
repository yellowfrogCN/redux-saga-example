// controlSaga.js
import { take, fork, race, call, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// 普通函数，故不需要加 *
function controlSaga (fn) {
    // 返回一个 Generator函数
    return function* (...args) {
        // 这边思考了一下，还是单单传action过去吧，不想传args这个数组过去, 感觉没什么意义
        const task = yield fork(fn, args[args.length - 1]);
        const timeOut = args[0].timeOut || 5000; // 默认5秒
        // 如果真的使用这个controlSaga函数的话，一般都会传取消的type过来, 加入真的不传的话，就用下面的方式比较误伤
        const cacalType = args[0].cancelType || `NOT_CANCEL${Math.random()}`; 
        yield race([
            call(delay, timeOut),
            // 实际业务需求
            take(cacalType)
        ]);
    
        yield cancel(task);
    }
}

export default controlSaga;

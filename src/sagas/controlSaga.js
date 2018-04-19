import { take, fork, race, call, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function controlSaga (fn) {
    return function* (...args) {
        const task = yield fork(fn, args[args.length - 1]);
        const timeOut = args[0].timeOut || 5000;
        const cacalType = args[0].cancelType || 'NOT_CANCEL';
        yield race([
            call(delay, timeOut),
            // 实际业务需求
            take(cacalType)
        ]);
    
        yield cancel(task);
    }
}

export default controlSaga;

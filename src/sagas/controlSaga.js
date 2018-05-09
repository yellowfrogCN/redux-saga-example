// controlSaga.js
import { take, fork, race, call, cancel, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// 普通函数，故不需要加 *
function enhanceSaga (fn) {
    // 返回一个 Generator函数
    /**
     * @param timeOut: 超时时间, 单位 ms, 默认 5000ms
     * @param cancelType: 取消任务的action.type
     * @param logger: 打印Saga函数信息 默认打印
     * @param showInfo: 打印被什么信息 默认打印
     */
    return function* (...args) {
        // console.log(process.env.ENV === 'develoption');
        // console.log(process.env.NODE_ENV === 'develoption');
        // 如果传 logger或showInfo进来，则用传进来的，否则用 后面的
        const logger = args[0].hasOwnProperty('logger') ? args[0].logger : true;
        const showInfo = args[0].hasOwnProperty('showInfo') ? args[0].showInfo : true;
        // 控制台打印信息，方便开发者知道调用了那个saga函数
        if (logger) {
            console.groupCollapsed(`%c${args[args.length - 1].type}  %c触发了Saga函数: %c${fn.name}`, `color: #e2988f`, `font-weight: bold `, `color: #1DA57A`);
            console.log(fn);
            console.groupEnd();
        }
        // 这边思考了一下，还是单单传action(args是数组，数组最后一个是action, 其他的是你传进来的参数)过去吧，不想传args这个数组过去, 感觉没什么意义
        const task = yield fork(fn, args[args.length - 1]);
        // 如果传进来，才走取消，否则没必要浪费性能了
        if (args[0].hasOwnProperty('timeOut') || args[0].hasOwnProperty('cancelType')) {
            const timeOut = args[0].timeOut || 5000; // 默认5秒
            // 如果真的使用这个controlSaga函数的话，一般都会传取消的type过来, 假如真的不传的话，配合Match.random()也能避免误伤
            const cancelType = args[0].cancelType || `NOT_CANCEL${Math.random()}`;

            const result = yield race({
                // 超时时间
                timeOut: call(delay, timeOut),
                // 手动取消 action
                handleToCancel: take(cancelType)
            });
            if (showInfo) {
                if (result.timeOut) yield put({type: `超过规定时间${timeOut}ms后自动取消`})
                if (result.handleToCancel) yield put({type: `手动取消，action.type为${cancelType}`})
            }

            yield cancel(task);
        }
    }
}

export default enhanceSaga;

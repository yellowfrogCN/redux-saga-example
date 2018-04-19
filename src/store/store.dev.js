import { createStore, applyMiddleware } from 'redux';
// redux 的 日志，在 生产环境中去掉
import { createLogger } from 'redux-logger';
// 可视化的redux状态树 https://github.com/yellowfrogCN/reduxDevTools
import { composeWithDevTools } from 'redux-devtools-extension';
// redux 异步处理使用更加强大的 redux-saga替代redux-thunk，redux-saga的缺点是代码量增加
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

// 优化一下提示信息。配合yf-helper的action.info（看下效果，如果效果不好再干掉）
function defaultTitleFormatter (action, time, took) {
    const parts = [];
    if (action.info) parts.push(`${String(action.info)}`);
    parts.push(`${String(action.type)}`);
    // 暂时先用不着下面这两个
    // if (time) parts.push(`触发时间:${String(time)}`);
    // if (took) parts.push(`(耗时: ${took.toFixed(3)} ms)`);
    return parts.join('    ')
}

// 配置redux日志
const logger = createLogger({
    // 耗时
    duration: true,
    // 折叠
    collapsed: true,
    titleFormatter: defaultTitleFormatter
});


const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer);
        });
    }

    sagaMiddleware.run(rootSaga)

    return store;
}

export default configureStore();

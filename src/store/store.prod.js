import { createStore, applyMiddleware } from 'redux';
// redux 异步处理使用更加强大的 redux-saga替代redux-thunk，redux-saga的缺点是代码量增加
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middleware)
        
    );

    sagaMiddleware.run(rootSaga)

    return store;
}

export default configureStore();

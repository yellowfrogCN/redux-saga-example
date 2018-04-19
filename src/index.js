import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入最高层的redux数据
import { Provider } from 'react-redux';
// 引入配置好的store（已经是执行的函数）
import store from './store';
// material-ui 的主题
import registerServiceWorker from './registerServiceWorker';
const Main = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
registerServiceWorker();

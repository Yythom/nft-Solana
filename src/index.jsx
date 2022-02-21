/* eslint-disable no-unused-expressions */
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'dayjs/locale/zh-cn';

import 'zarm/dist/zarm.min.css';
import dayjs from 'dayjs';
import './App.scss'
import './var.scss'
dayjs.locale('zh-cn');
if (process?.env?.NODE_ENV !== "development") window.console.log = () => { }
ReactDOM.render(
    <Provider store={store}>
        < App />
    </Provider>,
    document.getElementById('root')
);
// reportWebVitals();

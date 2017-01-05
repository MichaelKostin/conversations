'use strict';

import './css/main.less';
import  './index.html';
import React from 'react';
import { render } from 'react-dom';
import Root from './app/containers/Root';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './app/store/configureStore';

const appHistory = useRouterHistory(createHashHistory)();
const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);


render(
<Root store={store} history={history} />,
    document.getElementById('root')
);

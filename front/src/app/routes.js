'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Content from './containers/Content';
import NotFound from './components/NotFound';
import App from './containers/App';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Content}/>
        <Route path="*" component={NotFound}/>
    </Route>
);

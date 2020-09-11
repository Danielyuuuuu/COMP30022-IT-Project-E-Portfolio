import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import AdminRoute from './Router/AdminRoute.js';

import { Button } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    {/* <Button variant="contained" color="primary">
      你好，世界
    </Button> */}
    <AdminRoute />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

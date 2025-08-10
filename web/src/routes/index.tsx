import React from 'react';
import Home from '../components/home/index';

import { createBrowserRouter, Link } from 'react-router-dom';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);

export default Routes;

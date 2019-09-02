import React from 'react';
import './App.css';

import {useRoutes} from 'hookrouter';
import Routes from './Routes';
import NotFound from './pages/NotFound';

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult || <NotFound/>;
}

export default App;

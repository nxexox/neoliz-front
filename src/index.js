import React from 'react';
import ReactDOM from 'react-dom';
import MiniPage from './apps/MiniMainPage';
import SearchPage from './apps/SearchPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.css';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MiniPage} />
      <Route exact path="/search/" component={SearchPage} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
);
registerServiceWorker();

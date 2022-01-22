import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';
import { Redirect, Route, StaticRouter as Router, Switch } from 'react-router-dom';
import App from '../App';
import { storeonParams } from '../store';
import { createStoreon } from 'storeon';

const store = createStoreon(storeonParams);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const lang = 'ru';
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/:locale">
            <App lang={lang} />
          </Route>
          <Redirect to="/ru" />
        </Switch>
      </Router>
    </StoreContext.Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

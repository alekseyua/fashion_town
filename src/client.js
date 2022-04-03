import App from './App';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { StoreContext } from 'storeon/react';
import React from 'react';
import { storeonParams } from './store';
import { createStoreon } from 'storeon';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@garpix/garpix-web-components/loader';

import { RE_CAPTHA_KEY } from './const';
const store = createStoreon(storeonParams);


const { lang, } = window.__initLang__;
const INITIAL_DATA = window.__INITIAL_DATA__.page;
// console.log('__INITIAL_DATA__', INITIAL_DATA)
// console.log('lang', lang)

// const lang = 'ru';
const BaseApp = () => {
  /*
        reCaptchaKey={RE_CAPTHA_KEY}
        language={lang}
        useRecaptchaNet
        scriptProps={{
          async: true, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: 'head', // optional, default to "head", can be "head" or "body",
        }}
  */
  return (
    <GoogleReCaptchaProvider

    >
      <StoreContext.Provider
        value={store}
      >
        <Router>
          <Switch>
            <Route path="/:locale">
              <App lang={lang} pageServer={INITIAL_DATA}/>
            </Route>
            <Redirect to="/ru" />
          </Switch>
        </Router>
      </StoreContext.Provider>
    </GoogleReCaptchaProvider>
  );
};

// коментируем временно капчу чтобы не раздражала
ReactDOM.hydrate(<BaseApp />, document.getElementById('root'));

applyPolyfills().then(() => {
  defineCustomElements();
});

if (module.hot) {
  // module.hot.accept();
}

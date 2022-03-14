import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Combine from './pages/Combine';
import { PATHS, DEFAULT_CURRENCIES, ONE_YEARS, COOKIE_KEYS } from './const';
import { IntlProvider } from 'react-intl';
import locales from './locales';
import api from './api';
import { getCookie, setCookie } from './utils';

import '/node_modules/swiper/swiper.scss';
import '/node_modules/video-react/dist/video-react.css';
import '@garpix/garpix-web-components/dist/garpix-web-components/garpix-web-components.css';
import './styles/index.scss';
import { array } from 'yup';
import { fakeServer } from 'cypress/types/sinon';

const App = ({ lang, pageServer, ...props }) => {
  const { dispatch } = useStoreon();
  const { stateCountRestart } = useStoreon('stateCountRestart');
  const { updateCurrenssies } = useStoreon('updateCurrenssies');
  const { stateUpdateBalance } = useStoreon('stateUpdateBalance');
  const { statusRequstOrderCountryPayment } = useStoreon('statusRequstOrderCountryPayment');

  
  // в диспач закидываем все функуии
  
  api.setLanguage(lang);
  const { stateValuePoly } = useStoreon('stateValuePoly');
  let currency = getCookie(COOKIE_KEYS.CURRENCIES);
  let token = getCookie('ft_token');

  if (token){
  //********************************************************************************* */ 
  useEffect(() => {
    console.log('stateCountCart+++++++++')

    api
      .cartApi
      .getCartData()
      .then(res => {
         dispatch('stateCountCart/add', res)
    })
      .catch(err => console.log("ERROR CONNECT!!!!", err))
  }, [stateCountRestart, updateCurrenssies])
  // console.log('stateValuePoly.stateCart**********', stateValuePoly.stateCart);

  //********************************************************************************* */ 

  useEffect(() => {
    console.log('balance+++++++++')
    api
      .getUserBalance({
        "currency": currency
      })
      .then(res => {
        dispatch('dataBalance/set', res)
        dispatch('stateValuePoly/change', {
          stateCurrency: false,
          statePayment: false,
        })
        // setBalance(res)
      })
      .catch(err => console.error(`ERROR BALANCE ${err}`))
  }, [
    updateCurrenssies,
    stateValuePoly.statePayment,
    stateUpdateBalance
  ])

  //********************************************************************************* */ 
  useEffect(() => {
    api
      .profileApi
      .getWishlist()
      .then((res) => {
        dispatch('stateCountWish/add', res);
      })
      .catch((err) => { 
        console.log('ERROR getWishList');
      })
  }, [])
  //********************************************************************************* */ 
  useEffect(() => {

    api
      .orderApi
      .getCountry()
      .then(res => {
        dispatch('orderCountryPayment/add', res)
      })
      .catch(err => {
        console.error(`ERROR ${err}`);
      })

  }, [statusRequstOrderCountryPayment])

  //********************************************************************************* */ 


  //********************************************************************************* */ 

  //********************************************************************************* */ 

  //********************************************************************************* */ 

  //********************************************************************************* */ 
  }
  useEffect(() => {
    if (!currency) {
      //сохраняем в куки текущую валюту
      setCookie(COOKIE_KEYS.CURRENCIES, DEFAULT_CURRENCIES, ONE_YEARS);
      // обращаемся к функции currenssies/update и меняем состояние DEFAULT_CURRENCIES: "USD"

      dispatch('currenssies/update', DEFAULT_CURRENCIES);
    } else {
      dispatch('currenssies/update', currency); 
    }
  }, [currency]);
  //********************************************************************************* */ 

  // console.log('+++IntlProvider+++ RENDER',stateValuePoly);
  return (
    <IntlProvider
      locale={lang}
      messages={locales[lang]}
      defaultLocale="ru"
    >
      <Switch>
        <Route
          path={PATHS.ALL.path}
          render={(props) => <Combine {...props} {...PATHS.ALL} />}
        />
      </Switch>
    </IntlProvider>
  );
}

export default React.memo(App);

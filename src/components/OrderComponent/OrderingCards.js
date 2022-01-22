import React, { useEffect, useState } from 'react';
import { ROLE } from '../../const';
import Text from '../../components/Text';
import OrderingViews from '../../Views/OrderingViews';
import { useStoreon } from 'storeon/react';

// формирование карточек товара и разбиение их на группы приходят данные из OrderComponent
const OrderingCards   = ({
   role_configuration = {},
   cart_content = {}, 
   currenssies, 
  }) => {

  const { userPage, dispatch }  = useStoreon('userPage');

  const { role }      = userPage.profile;
  const { slug }      = userPage;
  const { cart_items = [], in_stock = [],delivery = {}, discount, price, total_price} = cart_content;

  return (
    <OrderingViews.CardsSection>
      {
      // для ОПТОВЫХ клиентов
      role === ROLE.WHOLESALE 
      ? (
        <React.Fragment>

          {cart_items.map((el, i) => {
            const isVisibleLine = cart_items.length - 1 !== i;

            return (
              <OrderingViews.CardWoasale
                isVisibleLine={isVisibleLine}
                key={`${el.id}-WHOLESALE`}
                currenssies={currenssies}
                {...el} 
              />
            );
          })}
          {in_stock.length ? (
            <OrderingViews.DefaulWrapperInStock title={<Text text={'inStock'} />}>
              {in_stock.map((el) => {

                return (
                  <OrderingViews.CardDropAndRetail
                    key={`${el.id}`}
                    currenssies={currenssies}
                    el={el}
                  />
                );
              })}
            </OrderingViews.DefaulWrapperInStock>
          ) : null}
        </React.Fragment>
      ) : (
        // для остальных клиентов
        <React.Fragment>
          {cart_items.map((el,i) => {

            return (
              <OrderingViews.CardDropAndRetail 
                key={`${el.id}`} 
                currenssies={currenssies} 
                el={el}
                count={i} 
                // delivery={delivery}
                // discount={discount}
                // product={el.product}

              />
            );
          })}
        </React.Fragment>
      )
      
      } 
    </OrderingViews.CardsSection>
  );
};

export default React.memo(OrderingCards);

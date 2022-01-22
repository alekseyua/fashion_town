import React from 'react';
import style from '../index.module.scss';

const PriceForYou = ({
  header = 'Цена для вас:',
  newPrice = '',
  oldPrice = '',
  price = '',
  currenssies,
}) => {
  currenssies = String(currenssies).toUpperCase();
  return (
    <div className={style['cabinet_market__card_price_wrap']}>
      <p className={style['cabinet_market__card_price_head']}>{header}</p>
      {header === 'Цена для вас:' ? (
        <>
          <p className={style['cabinet_market__card_price']}>
            {newPrice}&nbsp;{currenssies}
          </p>
          {oldPrice ? (
            <p className={style['cabinet_market__card_price-old']}>
              {oldPrice}&nbsp;{currenssies}
            </p>
          ) : null}
        </>
      ) : (
        <p className="cabinet_market__card_price cabinet_market__card_price-red">
          {price}&nbsp;{currenssies}
        </p>
      )}
    </div>
  );
};

export default React.memo(PriceForYou);

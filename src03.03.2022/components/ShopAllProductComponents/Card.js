import React, { useState } from 'react';
import MyShop from '../../Views/MyShopViews';
import { useStoreon } from 'storeon/react';
import { SHOP_PAGE } from '../../const';

const Card = ({
  id,
  image,
  newPrice,
  oldPrice,
  header = 'РРЦ:',
  price,
  checked,
  your_price,
  onSelectedPhoto,
  updateMyPrice,
  quicUpdateMyPrice,
  page,
}) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const handleChange = (e) => {
    onSelectedPhoto(id, e.target.checked);
  };
  const handleChangeMyPrice = (e) => {
    if (page === SHOP_PAGE.MY_PRODUCTS) {
      quicUpdateMyPrice(id, e.target.value);
    } else {
      updateMyPrice(id, e.target.value);
    }
  };
  return (
    <MyShop.AllProduct.Container nameOfStyle={'cabinet_market__card'}>
      <MyShop.AllProduct.SelectPictureWithDescription
        checked={checked}
        handleChange={handleChange}
        productCard={image}
        text={'Свитер такой-то вязаный колючий'}
      />

      <MyShop.AllProduct.PriceForYou
        currenssies={currenssies}
        newPrice={newPrice}
        oldPrice={oldPrice}
      />

      <MyShop.AllProduct.PriceForYou currenssies={currenssies} header={header} price={price} />

      <MyShop.AllProduct.YourPrice value={your_price} handleChange={handleChangeMyPrice} />
    </MyShop.AllProduct.Container>
  );
};

export default React.memo(Card);

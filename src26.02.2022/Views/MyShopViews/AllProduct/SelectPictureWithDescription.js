import React from 'react';
import style from '../index.module.scss';
import CheckBox from '../../CheckBox';

const SelectPictureWithDescription = ({ productCard, text, checked, handleChange }) => {
  return (
    <div className={style['cabinet_market__card_info']}>
      <CheckBox
        checked={checked}
        onGx-change={handleChange}
        className={style['product__selected_checkbox']}
      ></CheckBox>
      <img
        src={productCard}
        width="100px"
        height="100px"
        className={style['cabinet_market__card_image']}
      />
      <p className={style['cabinet_market__card_name']}>{text}</p>
    </div>
  );
};

export default React.memo(SelectPictureWithDescription);

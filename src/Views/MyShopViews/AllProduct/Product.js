import React from 'react';
import style from '../index.module.scss';
import { GxInput } from '@garpix/garpix-web-components-react';

const Product = ({ product, markup, handleChange, category_markup_id, category_id }) => {
  return (
    <div className={style['catfilter-price__wrap']}>
      <div className={style['catfilter-price__category']}>{product}</div>
      <GxInput
        onGx-change={(e) => handleChange(e, category_id)}
        className={style['catfilter-price__input']}
        value={markup}
      />
    </div>
  );
};

export default React.memo(Product);

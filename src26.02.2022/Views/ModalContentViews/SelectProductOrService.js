import React from 'react';
import { GxRadio } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const SelectProductOrService = ({ setReviewType, product, service }) => {

  return (
    <div className={style['wrapper-radio']}>
      <GxRadio
        checked={product}
        onClick={() => {
          setReviewType('product');
        }}
      >
        Отзыв о товаре
      </GxRadio>
      <GxRadio
        checked={service}
        onClick={() => {
          setReviewType('service');
        }}
      >
        Отзыв о сервисе
      </GxRadio>
    </div>
  );
};

export default React.memo(SelectProductOrService);

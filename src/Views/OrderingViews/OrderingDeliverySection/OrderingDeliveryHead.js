import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import Title from '../../Title';
import { truck } from '../../../images';
import Text from '../../../components/Text';
import style from '../styles/index.module.scss';
import { fromCallback } from 'cypress/types/bluebird';

const OrderingDeliveryHead = ({}) => {
  return (
    <div className={style['ordering_pay__head_wrap']}>
      <GxIcon src={truck} className={style['ordering__icon']} />
      <Title variant={'cart'} type={'h2'}>
        <Text text="delivery.method" />
      </Title>
    </div>
  );
};

export default React.memo(OrderingDeliveryHead);

import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import Title from '../../Title';
import Text from '../../../components/Text';
import { wallet } from '../../../images';
import style from '../styles/index.module.scss';

const OrderingPayHead = ({}) => {
  return (
    <div className={style['ordering_pay__head_wrap']}>
      <GxIcon src={wallet} className={style['ordering__icon']} />
      <Title variant={'cart'} type={'h2'}>
        <Text text="payment.method" />
      </Title>
    </div>
  );
};
export default React.memo(OrderingPayHead);

import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { addressIcon } from '../../../images'
import Title from '../../Title';
import Text from '../../../components/Text'
import style from '../styles/index.module.scss';

const OrderingAddressHead = ({ }) => {
  return (
    <React.Fragment>
      <div className={style['ordering_pay__head_wrap']}>
        <GxIcon src={addressIcon} className={style['ordering__icon']} />
        <Title variant={'cart'} type={'h2'}>
          <Text text="addres.delivery" />
        </Title>
      </div>
      <p className={style['ordering__desc']}>
        Укажите адрес, по которому хотите получить заказ.
        <br />
        Вы можете выбрать адрес из сохранённых в личном кабинете либо добавить новый.
      </p>
    </React.Fragment>
  );
};
export default React.memo(OrderingAddressHead);

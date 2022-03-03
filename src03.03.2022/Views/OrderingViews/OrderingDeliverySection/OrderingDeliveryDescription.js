import React from 'react';
import style from '../styles/index.module.scss';
import { ROLE } from '../../../const';

const OrderingDeliveryDescription = ({ role }) => {
  console.log('role delivery', role)
  return (
    <>
    {
      role === ROLE.RETAIL ?
      (<p className={style['ordering__desc']}>
        ℹ️    Стоимость доставки зависит от страны. После заполнения графы «адрес доставки» Вы увидите цену
      </p>)
      : role === ROLE.DROPSHIPPER ?
        (<p className={style['ordering__desc']}>
          ℹ️    Стоимость доставки зависит от веса. Точная стоимость указывается в момент упаковки товара (после выкупа). Тарифы доступны в разделе «Доставка»
        </p>)
        : role === ROLE.WHOLESALE ?
          (<p className={style['ordering__desc']}>
            ℹ️    Стоимость доставки зависит от веса. Тарифы доступны в разделе «Доставка»
          </p>)
          : (
            <p className={style['ordering__desc']}>
              Укажите адрес, по которому хотите получить заказ.
              <br />
              Вы можете выбрать адрес из сохранённых в личном кабинете либо добавить новый.
            </p>
          )
        }
        </>
  );
};

export default React.memo(OrderingDeliveryDescription);

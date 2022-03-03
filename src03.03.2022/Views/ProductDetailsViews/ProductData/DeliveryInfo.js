import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { deliveryIcon } from '../../../images';
import Text from '../../../components/Text';
import style from '../styles/index.module.scss';
import { ROLE } from '../../../const';

const DeliveryInfo = ({ description = '', role_configuration }) => {
  const { number: role } = role_configuration.role;
  return (
    <div className={style['prodpage__delivery-info']}>
      <p className={style['prodpage__delivery-info-title']}>
        <GxIcon src={deliveryIcon} className={style['prodpage__delivery-info-icon']}></GxIcon>
        <span>
          {role === ROLE.RETAIL ? <Text text="options.free.delivery" /> : <Text text="deliveryOptions" />}
        </span>
      </p>
      <div className={style['prodpage__delivery-info-description']}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};

export default React.memo(DeliveryInfo);

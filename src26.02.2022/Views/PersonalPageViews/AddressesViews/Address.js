import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { addressIcon } from '../../../images';
import style from '../styles/wrapper.module.scss';
import Button from '../../Button';
import Text from '../../../components/Text';

const Address = (props) => {
  const {
    address = 'address',
    userFullName = 'Name',
    phone = '79204525366',
    id,
    changeAddress,
    deleteAddress,
    country = '',
    post_code = '',
    city = '',
    street = '',
    house = '',
    flat = '',
  } = props
  return (
    <div className={style['cabinet-address']}>
      <GxIcon className={style['cabinet-address__icon']} src={addressIcon} alt="address" />
      <div className={style['cabinet-address__desc']}>
        <div
          className={style['cabinet-address__value']}
        >{`${country}, ${post_code}, ${city}, ${street}, д.${house} кв.${flat}`}</div>
        <div className={style['cabinet-address__name']}>{userFullName}</div>
        <div className={style['cabinet-address__phone']}>{phone}</div>
        <div className={style['cabinet-address__actions']}>
          <Button
            onClick={() => changeAddress(props)}
            variant={'cabinet-change__address'}
            className={style['linkblue']}
            data-cy={'change_address_button'}
          >
            <Text text={'change'} />
          </Button>
          <Button
            onClick={() => deleteAddress(id)}
            variant={'cabinet-delete__address'}
            className={style['linkblue']}
            data-cy={'delete_address_button'}
          >
            <Text text={'delete'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Address);

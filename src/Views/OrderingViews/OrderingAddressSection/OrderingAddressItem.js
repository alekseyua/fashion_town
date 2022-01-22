import React from 'react';
import { GxRadio } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const OrderingAddressItem = ({
  city,
  country,
  first_name,
  flat,
  house,
  id,
  last_name,
  middle_name,
  phone,
  post_code,
  profile,
  street,
  selectedAdress,
  setFieldValue,
  setFieldCountry,
}) => {

  return (
    <GxRadio
      checked={selectedAdress === id ? true : null}
      id={id}
      onClick={(e) => {
        setFieldValue('selectedAdress', id);
        setFieldCountry(country);
      }}
      name="address"
      className={style['ordering_address__card']}
    >
      <p className={style['ordering_address__card_address']}>
        {country}, {post_code}, {city}, {street}, {house}, {flat}
      </p>
      <p className={style['ordering_address__card_client']}>
        {last_name} {first_name} {middle_name}, {phone}
      </p>
    </GxRadio>
  );
};

export default React.memo(OrderingAddressItem);

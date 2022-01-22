import React from 'react';
import style from '../styles/wrapper.module.scss';
import Button from '../../Button';
import Text from '../../../components/Text';

const AddAdress = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant={'cabinet-addres'} className={style['cabinet-addressnew']} data-cy={'create_address_button'}>
      <span className={style['cabinet-addressnew__label']}>
        + <Text text={'add.adress'} />
      </span>
    </Button>
  );
};
export default React.memo(AddAdress);

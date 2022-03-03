import React from 'react';
import Text from '../../../components/Text';
import Button from '../../Button';
import style from '../styles/wrapper.module.scss';

const FormBottom = ({ onClickChangePassword, children }) => {
  return (
    <div className={style['cabinet-form__end']}>
      <div className={style['cabinet-form__endleft']}>
        <Button variant={"cabinet-linkblue"} onClick={onClickChangePassword} className={style['linkblue']}>
          <Text text={'changePasswor'} />
        </Button>
      </div>
      <div className={style['cabinet-form__endright']}>{children}</div>
    </div>
  );
};
export default React.memo(FormBottom);

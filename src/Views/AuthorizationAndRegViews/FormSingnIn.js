import React from 'react';
import Text from '../../components/Text';
import Title from '../Title';
import style from './styles/formSignIn.module.scss';

const FormSingnIn = ({ children }) => {
  return (
    <div className={style['wrapper']}>
      <Title variant={'poppins'}>
        <Text text={'signIn'} />
      </Title>
      <div className={style['wrapper__title__help-text']}>
        <Text text={'reauestDataRegistration'} />
      </div>
      {children}
    </div>
  );
};

export default React.memo(FormSingnIn);

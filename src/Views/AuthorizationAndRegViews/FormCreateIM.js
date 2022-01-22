import React from 'react';
import Text from '../../components/Text';
import Title from '../Title';
import style from './styles/formSignIn.module.scss';
import indexStyle from './styles/index.module.scss'

const FormCreateIM = ({ children }) => {
  return (
    <div className={style['wrapper']}>
      <Title variant={'productdescription__title'}>
        <Text text={'create.im'} />
      </Title>
      <div className={indexStyle["line"]}></div>
      {children}
    </div>
  );
};

export default React.memo(FormCreateIM);

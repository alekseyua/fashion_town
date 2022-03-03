import React from 'react';
import { NavLink } from 'react-router-dom'
import Text from '../../components/Text'
import style from './styles/registrBlock.module.scss'

const RegistrationBlock = ({ to = '#' }) => {
  return (
    <div className={style['wrapper']}>
      <span className={style['wrapper-help_text']}>
        <Text text={'dontHaveAccount'} />
      </span>
      &nbsp;
      <NavLink className={style['wrapper-link']} to={to}>
        <Text text={'register'} />
      </NavLink>
    </div>
  );
};

export default React.memo(RegistrationBlock);

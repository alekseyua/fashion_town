import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../components/Text';
import style from './styles/registrBlock.module.scss';

const AuthorizationBlock = ({ to = '#' }) => {
  return (
    <div className={style['wrapper']}>
      <span className={style['wrapper-help_text']}>
        <Text text={'alreadyHaveAccount'} />
      </span>
      &nbsp;
      <NavLink className={style['wrapper-link']} to={to}>
        <Text text={'authorization'} />
      </NavLink>
    </div>
  );
};

export default React.memo(AuthorizationBlock);

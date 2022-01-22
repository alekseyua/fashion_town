import React from 'react';
import Text from '../../components/Text';
import { NavLink } from 'react-router-dom';
import style from './registrLink.module.scss'

const RegistrLink = ({ to = '#' }) => {
  return (
    <div className={style["wrapper"]}>
      <span className={style["wrapper-help_text"]}>
        <Text text={'dontHaveAccount'} />
      </span>&nbsp;
      <NavLink className={style["wrapper-link"]} to={to} data-cy={'registration_in_header'}>
        <Text text={'register'} />
      </NavLink>
    </div>
  );
};

export default React.memo(RegistrLink);

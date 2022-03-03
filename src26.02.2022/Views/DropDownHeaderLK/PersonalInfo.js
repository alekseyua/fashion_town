import React from 'react';
import style from './personalInfo.module.scss';
import { initialsName } from '../../utils';

const PersonalInfo = ({ first_name, last_name, role }) => {
  return (
    <div className={style['wrapper']}>
      <div className={style['wrapper-ellipse']}>{initialsName(first_name, last_name)}</div>
      <div className={style['wrapper-name_and_role']}>
        <p className={style['wrapper-name_and_role-name']}>
          {first_name}
          <br />
          {last_name}
          <br />
          <span className={style['wrapper-name_and_role-role']}>{role}</span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(PersonalInfo);

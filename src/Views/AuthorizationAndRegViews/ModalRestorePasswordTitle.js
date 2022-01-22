import React from 'react';
import style from './styles/restorePassword.module.scss';

const ModalRestorePasswordTitle = ({ title, mb = '0' }) => {
  return (
    <div className={style['restore-password__title']} style={{ marginBottom: mb }}>
      {title}
    </div>
  );
};

export default React.memo(ModalRestorePasswordTitle);
